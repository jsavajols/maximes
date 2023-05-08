<script>
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

    async function validateForm() {
        if (author) {
            if (isSelected) {
                await update();
            } else {
                await create();
            }
        }
    }

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

{#if lineSelected === -1}
    <div
        class="button-add"
        style="cursor:pointer"
        on:click={add}
        on:keydown={null}
    >
        <img src="/button_add.png" alt="add" width="25%" />
    </div>
    <div class="bg-white top-24 w-screen">
        <input placeholder="Recherche des auteurs" bind:value={prefix} />
    </div>
    {#each filteredauthors as selectedAuthor, i}
        <div
            class=""
            on:click={() => listClick(selectedAuthor, i)}
            on:keydown={null}
        >
            <div
                class="listItem hover:bg-slate-500 hover:transition ease-out duration-500"
            >
                {selectedAuthor.compteur} - {selectedAuthor.author}
            </div>
        </div>
    {/each}
{:else}
    <div class="">
        <div class="cursor-pointer mb-8" on:click={list} on:keydown={null}>
            <svg
                class="w-10"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
            </svg>
        </div>

        <div class="mb-4">
            <form on:submit|preventDefault={validateForm}>
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
                    autofocus
                    placeholder="Nom de l'auteur"
                />
            </form>
        </div>
    </div>
    <section
        class="fixed inset-x-0 bottom-0 z-10 bg-white shadow flex justify-between"
    >
        {#if author && !isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!author || isSelected}
                on:click={create}>Add</button
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
    </section>

    {#if error}
        <div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Attention
            </div>
            <div
                class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
            >
                <p>{error}</p>
            </div>
        </div>
    {/if}
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
</style>
