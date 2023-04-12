<script>
    import Header from "../../../components/header/+header.svelte";
    import Footer from "../../../components/footer/+footer.svelte";
    import "../../../global.css";

    import { onMount } from "svelte";

    // @ts-ignore
    let recordsMaxims = [];
    async function refresh() {
        const res = await fetch(`/api/maxims/`);
        recordsMaxims = await res.json();
    }

    onMount(async () => {
        await refresh();
        clear();
    });

    let prefix = "";
    let author = "";
    let maxim = "";
    let i = 0;
    let result = "";
    let isSelected = false;
    let lineSelected = -1;

    $: filteredauthors = prefix
        ? // @ts-ignore
          recordsMaxims.filter((selectedMaxim) => {
              const name = `${selectedMaxim.author.author}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : // @ts-ignore
          recordsMaxims;

    $: selected = filteredauthors[i];
    // @ts-ignore
    $: reset_inputs(selected);

    async function create() {
        i = recordsMaxims.length - 1;
        const res = await fetch("../api/maxims/", {
            method: "POST",
            body: JSON.stringify({
                author,
                maxim,
            }),
        });
        const json = await res.json();
        result = JSON.stringify(json);
        clear();
        await refresh();
        lineSelected = -1;
    }

    async function update() {
        selected.author = author;
        selected.maxim = maxim;
        const Id = selected.compteur;
        const res = await fetch("../api/maxims/", {
            method: "PUT",
            body: JSON.stringify({
                Id,
                author,
                maxim,
            }),
        });
        const json = await res.json();
        result = JSON.stringify(json);
        clear();
        await refresh();
        lineSelected = -1;
    }

    async function remove() {
        await fetch(`/api/maxims/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredauthors.length - 2);
        await refresh();
        lineSelected = -1;
    }

    function clear() {
        author = "";
        maxim = "";
        isSelected = false;
        lineSelected = -1;
    }

    // @ts-ignore
    function reset_inputs(selectedMaxim) {
        author = selectedMaxim ? selectedMaxim.author.author : "";
        maxim = selectedMaxim ? selectedMaxim.maxim : "";
        isSelected = true;
    }

    // @ts-ignore
    function listClick(theFilteredauthor, lineNumber) {
        selected = theFilteredauthor;
        lineSelected = lineNumber;
    }
</script>

<div class="page">
    <Header />
    <h1>Liste des maximes</h1>
    <input placeholder="Recherche des maximes" bind:value={prefix} />

    <div class="liste">
        <table style="width: 100%">
            {#each filteredauthors as selectedMaxim, i}
                <tr
                    class={i === lineSelected ? "lineIsSelected" : ""}
                    on:click={() => listClick(selectedMaxim, i)}
                >
                    <td
                        style="border: 1px solid black; width: 100%"
                        align="left"
                    >
                        {selectedMaxim.compteur} - {selectedMaxim.author.author}
                        - {selectedMaxim.maxim}
                    </td>
                </tr>
            {/each}
        </table>
    </div>

    <div class="saisie">
        <label
            >Nom de l'auteur <input
                style="width:100%"
                bind:value={author}
                placeholder="Auteur"
            /></label
        >
        <label
            >Maxime<textarea
                style="width:100%"
                placeholder="Maxime"
                rows="5"
                bind:value={maxim}
            /></label
        >
    </div>
    <div class="buttons">
        <button on:click={clear} disabled={!author}>Clear</button>
        <button on:click={create} disabled={!author || isSelected}>Ajout</button
        >
        <button on:click={update} disabled={!author || !selected || !isSelected}
            >Modification</button
        >
        <button on:click={remove} disabled={!selected || !isSelected}
            >Suppression</button
        >
    </div>

    <Footer />
</div>

<style>
    * {
        font-family: inherit;
        font-size: inherit;
    }

    .liste {
        height: 300px;
        overflow: auto;
    }

    .lineIsSelected {
        background-color: lightblue;
    }

    input {
        display: block;
        margin: 0 0 0.5em 0;
    }

    .saisie {
        margin-top: 5%;
    }

    .buttons {
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        font-family: sans-serif;
        font-size: large;
        clear: both;
    }
</style>
