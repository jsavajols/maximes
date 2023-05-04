<script>
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

    function clearForm() {
        author = "";
        maxim = "";
    }

    function list() {
        lineSelected = -1;
    }

    function add() {
        clearForm();
        lineSelected = 0;
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
                >Rechercher une maxime<input
                    placeholder="Recherche des maximes"
                    bind:value={prefix}
                /></label
            >
        </div>
            {#each filteredauthors as selectedMaxim, i}
                <div
                    on:click={() => listClick(selectedMaxim, i)}
                    on:keydown={null}
                >
                    
                    <div class="listItem hover:bg-slate-500 hover:transition ease-out duration-500">
                    
                        {selectedMaxim.compteur} - {selectedMaxim.author.author}
                        - {selectedMaxim.maxim}
                    </div>
                </div>
            {/each}
    {:else}
        <div class="mt-20">
            <div class="cursor-pointer mb-8" on:click={list} on:keydown={null}>
                <svg class="w-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"></path>
                  </svg>
            </div>
    
            <label
                >Nom de l'auteur <input
                    style="width:100%"
                    bind:value={author}
                    placeholder="Auteur"
                /></label
            >
            <label
                >Maxime<textarea
                    style="width:100%; padding: 0.5em;"
                    placeholder="Maxime"
                    rows="5"
                    bind:value={maxim}
                /></label
            >
        </div>
        <div class="flex justify-between mt-10">
            {#if author}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={clearForm}
                disabled={!author}>Clear</button
            >
            {/if}
            {#if author && !isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={create}
                disabled={!author || isSelected}>Add</button
            >
            {/if}
            {#if author && selected && isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={update}
                disabled={!author || !selected || !isSelected}>Update</button
            >
            {/if}
            {#if selected && isSelected && author}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={remove}
                disabled={!selected || !isSelected}>Delete</button
            >
            {/if}
        </div>
    {/if}


<style>
    input {
        display: block;
        margin: 0 0 0.5em 0;
        padding: 0.5em;
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
        top: 80px;
    }
</style>
