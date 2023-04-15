<script>
    import Header from "../../../components/header/+header.svelte";
    import Footer from "../../../components/footer/+footer.svelte";
    import "../../../global.css";

    import { onMount } from "svelte";

    // @ts-ignore
    let recordsAuthors = [];
    async function refresh() {
        const res = await fetch(`/api/authors/`);
        recordsAuthors = await res.json();
    }

    onMount(async () => {
        await refresh();
        clear();
    });

    let prefix = "";
    let author = "";
    let i = 0;
    let result = "";
    let isSelected = false;
    let lineSelected = -1;

    $: filteredauthors = prefix
        ? // @ts-ignore
          recordsAuthors.filter((selectedAuthor) => {
              const name = `${selectedAuthor.author}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : // @ts-ignore
          recordsAuthors;

    $: selected = filteredauthors[i];
    $: reset_inputs(selected);

    async function create() {
        i = recordsAuthors.length - 1;
        const res = await fetch("../api/authors/", {
            method: "POST",
            body: JSON.stringify({
                author,
            }),
        });
        const json = await res.json();
        result = JSON.stringify(json);
        await refresh();
        clear();
        lineSelected = -1;
    }

    async function update() {
        selected.author = author;
        const Id = selected.compteur;
        const res = await fetch("../api/authors/", {
            method: "PUT",
            body: JSON.stringify({
                Id,
                author,
            }),
        });
        const json = await res.json();
        result = JSON.stringify(json);
        clear();
        await refresh();
        lineSelected = -1;
    }

    async function remove() {
        await fetch(`/api/authors/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredauthors.length - 2);
        await refresh();
        lineSelected = -1;
    }

    function clear() {
        author = "";
        isSelected = false;
        lineSelected = -1;
    }

    function list() {
        lineSelected = -1;
    }

    // @ts-ignore
    function reset_inputs(selectedAuthor) {
        author = selectedAuthor ? selectedAuthor.author : "";
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
    {#if lineSelected === -1}
        <label
            >Rechercher un auteur<input
                placeholder="Recherche des auteurs"
                bind:value={prefix}
            /></label
        >

        <div class="liste">
            {#each filteredauthors as selectedAuthor, i}
                <div
                    class={i === lineSelected ? "lineIsSelected" : ""}
                    on:click={() => listClick(selectedAuthor, i)}
                >
                    <div class="lineList">
                        {selectedAuthor.compteur} - {selectedAuthor.author}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="saisie">
            <label
                >Nom de l'auteur<input
                    style="width:100%"
                    bind:value={author}
                    placeholder="Auteur"
                /></label
            >
        </div>
        <div class="buttons">
            <button on:click={list} disabled={!author}>List</button>
            <button on:click={clear} disabled={!author}>Clear</button>
            <button on:click={create} disabled={!author || isSelected}
                >Add</button
            >
            <button
                on:click={update}
                disabled={!author || !selected || !isSelected}>Update</button
            >
            <button on:click={remove} disabled={!selected || !isSelected}
                >Delete</button
            >
        </div>
    {/if}
    <Footer />
</div>

<style>
    .liste {
        overflow: auto;
    }

    .lineList {
        border: 1px solid black;
        width: 94%;
        height: 50px;
        padding: 10px;
        font-size: 1.5em;
        margin-top: 5%;
        border-radius: 20px;
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
        font-size: large;
        clear: both;
        clear: both;
    }
    label {
        font-size: 1.5em;
    }
</style>
