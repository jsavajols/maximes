<script>
    // @ts-nocheck

    import { onMount } from "svelte";

    let recordsCards = [];
    async function refresh() {
        const res = await fetch(`/api/cards/`);
        recordsCards = await res.json();
    }

    onMount(async () => {
        await refresh();
        clear();
    });

    let prefix = "";
    let card = "";
    let i = 0;
    let isSelected = false;
    let lineSelected = -1;
    let error = "";
    let mode = "show";

    $: filteredcards = prefix
        ? recordsCards.filter((selectedCard) => {
              const name = `${selectedCard.card_text}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : recordsCards;

    $: selected = filteredcards[i];
    $: reset_inputs(selected);

    async function validateForm() {
        if (card) {
            if (mode === "update") {
                await update();
            } else {
                await create();
            }
        }
    }

    async function create() {
        i = recordsCards.length - 1;
        const res = await fetch("../api/cards/", {
            method: "POST",
            body: JSON.stringify({
                card,
            }),
        });
        const json = await res.json();
        await refresh();
        clear();
        lineSelected = -1;
    }

    async function update() {
        selected.card = card;
        const Id = selected.compteur;
        const res = await fetch("../api/cards/", {
            method: "PUT",
            body: JSON.stringify({
                Id,
                card,
            }),
        });
        const json = await res.json();
        await refresh();
        clear();
        lineSelected = -1;
    }

    async function remove(theFilteredcard) {
        selected = theFilteredcard;
        await fetch(`/api/cards/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredcards.length - 2);
        await refresh();
        lineSelected = -1;
    }

    function clear() {
        card = "";
        isSelected = false;
        lineSelected = -1;
    }

    function list() {
        lineSelected = -1;
    }

    function modeAdd() {
        mode = "add";
        clear();
        lineSelected = 0;
    }

    function reset_inputs(selectedCard) {
        card = selectedCard ? selectedCard.card_text : "";
        isSelected = true;
    }

    function listClick(theFilteredcard, lineNumber) {
        error = "";
        selected = theFilteredcard;
        lineSelected = lineNumber;
    }
</script>

{#if lineSelected === -1}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:click={modeAdd}
        on:keydown={null}
        data-dial-init
        class="fixed right-6 bottom-6 group"
    >
        <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
            <svg
                aria-hidden="true"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                /></svg
            >
            <span class="sr-only">Ajouter</span>
        </button>
    </div>

    <div class="bg-white top-24 w-screen">
        <input placeholder="Recherche des cartes" bind:value={prefix} />
        <div>
            {filteredcards.length} cartes
        </div>
    </div>
    <!-- List begins -->
    {#each filteredcards as selectedCard, i}
        <div
            class="grid grid-col-12 grid-flow-col listItem hover:bg-slate-500 hover:transition ease-out duration-500"
        >
            <!-- Show line -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="col-start-1 col-end-10"
                on:click={() => {
                    mode = "show";
                    listClick(selectedCard, i);
                }}
                on:keydown={null}
            >
                {selectedCard.compteur} - {selectedCard.card_text}
            </div>
            <!-- Update -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="col-start-11 col-end-10 flex justify-end cursor-pointer"
                on:click={() => {
                    mode = "update";
                    listClick(selectedCard, i);
                }}
                on:keydown={null}
            >
                <svg
                    class="w-5"
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                </svg>
            </div>
            <!-- delete -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="col-start-12 flex justify-end cursor-pointer"
                on:click={() => {
                    remove(selectedCard);
                }}
                on:keydown={null}
            >
                <svg
                    class="w-5"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </div>
        </div>
    {/each}
    <!-- List ends -->
{:else}
    <div class="">
        <form on:submit|preventDefault={validateForm}>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
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

            <label
                >Contenu de la carte
                <!-- svelte-ignore a11y-autofocus -->
                <textarea
                    style="width:100%; padding: 0.5em;"
                    rows="5"
                    bind:value={card}
                    disabled={mode == "show"}
                    autofocus
                    placeholder="Carte"
                /></label
            >
        </form>
    </div>

    <div class="flex justify-between mt-10">
        {#if card && !isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={create}
                disabled={!card || isSelected}>Add</button
            >
        {/if}

        {#if card && selected && isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={update}
                disabled={!card || !selected || !isSelected}>Update</button
            >
        {/if}
    </div>
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
</style>
