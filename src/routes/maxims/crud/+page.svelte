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
    }

    async function remove() {
        await fetch(`/api/maxims/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredauthors.length - 2);
        await refresh();
    }

    function clear() {
        author = "";
        maxim = "";
        isSelected = false;
    }

    // @ts-ignore
    function reset_inputs(selectedMaxim) {
        author = selectedMaxim ? selectedMaxim.author.author : "";
        maxim = selectedMaxim ? selectedMaxim.maxim : "";
        isSelected = true;  
    }
</script>

<div class="page">
    <Header />
    <h1>Liste des maximes</h1>
    <input placeholder="Recherche des maximes" bind:value={prefix} />

    <select bind:value={i} size={15}>
        {#each filteredauthors as selectedMaxim, i}
            <option value={i}>{selectedMaxim.author.compteur} {selectedMaxim.author.author} {selectedMaxim.maxim}</option>
        {/each}
    </select>

    <label><input bind:value={author} placeholder="Auteur" /></label>
    <label><textarea placeholder="Maxime" rows="5" bind:value={maxim} /></label>

    <div class="buttons">
        <button on:click={clear} disabled={!author}>Clear</button>
        <button on:click={create} disabled={!author || isSelected}>Ajout</button>
        <button on:click={update} disabled={!author || !selected || !isSelected}>Modification</button
        >
        <button on:click={remove} disabled={!selected || !isSelected}>Suppression</button>
    </div>

    <Footer />
</div>

<style>
    * {
        font-family: inherit;
        font-size: inherit;
    }

    input {
        display: block;
        margin: 0 0 0.5em 0;
    }

    select {
        float: left;
        margin: 0 1em 1em 0;
        width: 14em;
    }

    .buttons {
        clear: both;
    }
</style>
