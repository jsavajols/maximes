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

    $: filteredauthors = prefix
        ? // @ts-ignore
          recordsAuthors.filter((selectedAuthor) => {
              const name = `${selectedAuthor.author}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : // @ts-ignore
          recordsAuthors;

    $: selected = filteredauthors[i];
    // @ts-ignore
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
    }

    async function remove() {
        await fetch(`/api/authors/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredauthors.length - 2);
        await refresh();
    }

    function clear() {
        author = "";
        isSelected = false;
    }

    // @ts-ignore
    function reset_inputs(selectedAuthor) {
        author = selectedAuthor ? selectedAuthor.author : "";
        isSelected = true;
    }
</script>

<div class="page">
    <Header />
    <h1>Liste des auteurs</h1>
    <input placeholder="Recherche des auteurs" bind:value={prefix} />

    <select bind:value={i} size={15}>
        {#each filteredauthors as selectedAuthor, i}
            <option value={i}>{selectedAuthor.compteur} - {selectedAuthor.author}</option>
        {/each}
    </select>

    <label><input bind:value={author} placeholder="Auteur" /></label>

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
