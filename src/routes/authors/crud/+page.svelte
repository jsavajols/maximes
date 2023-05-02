<script>
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
    let error = "";
    let i = 0;
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
        const passedAuthor = author;
        const res = await fetch("../api/authors/", {
            method: "POST",
            body: JSON.stringify({
                author,
            }),
        });
        console.log(author);
        const json = await res.json();
        if (json.error) {
            error = json.error;
            add();
            author = passedAuthor;
        } else {
            await refresh();
            clear();
            lineSelected = -1;
        }
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

    function clearForm() {
        author = "";
    }

    function list() {
        lineSelected = -1;
    }

    function add() {
        clear();
        lineSelected = 0;
    }

    // @ts-ignore
    function reset_inputs(selectedAuthor) {
        author = selectedAuthor ? selectedAuthor.author : "";
        isSelected = true;
    }

    // @ts-ignore
    function listClick(theFilteredauthor, lineNumber) {
        error = "";
        selected = theFilteredauthor;
        lineSelected = lineNumber;
    }
</script>

<main>
    {#if lineSelected === -1}
        <div
            class="button-add"
            style="cursor:pointer"
            on:click={add}
            on:keydown={null}
        >
            <img src="/button_add.png" alt="add" width="25%" />
        </div>
        <div class="search">
            <label
                >Rechercher un auteur<input
                    placeholder="Recherche des auteurs"
                    bind:value={prefix}
                /></label
            >
        </div>
        <div class="liste">
            {#each filteredauthors as selectedAuthor, i}
                <div
                    class={i === lineSelected ? "lineIsSelected" : ""}
                    on:click={() => listClick(selectedAuthor, i)}
                    on:keydown={null}
                >
                    <div class="listItem">
                        {selectedAuthor.compteur} - {selectedAuthor.author}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="saisie">
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="author"
                >
                    Nom de l'auteur
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="author"
                    type="text"
                    bind:value={author}
                    placeholder="Nom de l'auteur"
                />
            </div>
        </div>
        <div class="flex justify-between">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={create}
                disabled={!author || isSelected}>Add</button
            >
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={clearForm}
                disabled={!author}>Clear</button
            >
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={update}
                disabled={!author || !selected || !isSelected}>Update</button
            >
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={remove}
                disabled={!selected || !isSelected}>Delete</button
            >
        </div>
        <div>
            {error}
        </div>
        <div style="cursor:pointer" on:click={list} on:keydown={null}>
            <img src="/button_back.png" alt="back" width="10%" />
        </div>
    {/if}
</main>

<style>
    .liste {
        overflow: auto;
        z-index: 1;
    }

    .lineList {
        border: 1px solid black;
        width: 94%;
        height: 50px;
        padding: 25px 0px 0px 20px;
        font-size: 1.5em;
        margin-top: 5%;
        border-radius: 20px;
        cursor: pointer;
    }

    .lineIsSelected {
        background-color: lightblue;
    }

    input {
        display: block;
        margin: 0 0 0.5em 0;
        padding: 0.5em;
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
    .button-add {
        position: fixed;
        bottom: 0;
        right: 20px;
        z-index: 99999;
        text-align: end;
    }

    .search {
        position: sticky;
        width: 100%;
        background-color: white;
        top: 150px;
        margin-bottom: 25px;
    }
</style>
