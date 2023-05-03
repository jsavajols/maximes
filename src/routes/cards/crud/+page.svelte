<script>
    import "../../../global.css";

    import { onMount } from "svelte";

    // @ts-ignore
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

    $: filteredcards = prefix
        ? // @ts-ignore
          recordsCards.filter((selectedCard) => {
              const name = `${selectedCard.card_text}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : // @ts-ignore
          recordsCards;

    $: selected = filteredcards[i];
    // @ts-ignore
    $: reset_inputs(selected);

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

    async function remove() {
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

    function clearForm() {
        card = "";
    }

    function list() {
        lineSelected = -1;
    }

    function add() {
        clearForm();
        lineSelected = 0;
    }

    // @ts-ignore
    function reset_inputs(selectedCard) {
        card = selectedCard ? selectedCard.card_text : "";
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
            >Rechercher une carte<input
                placeholder="Recherche des cartes"
                bind:value={prefix}
            /></label
        >
    </div>
    <div class="liste">
        {#each filteredcards as selectedCard, i}
            <div
                class={i === lineSelected ? "lineIsSelected" : ""}
                on:click={() => listClick(selectedCard, i)}
                on:keydown={null}
            >
                <div class="listItem">
                    {selectedCard.compteur} - {selectedCard.card_text}
                </div>
            </div>
        {/each}
    </div>
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

        <label
            >Contenu de la carte
            <textarea
                style="width:100%; padding: 0.5em;"
                placeholder="Carte"
                rows="5"
                bind:value={card}
            /></label
        >
    </div>

    <div class="flex justify-between mt-10">
        {#if card}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={clearForm}
                disabled={!card}>Clear</button
            >
        {/if}
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
        {#if selected && isSelected && card}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={remove}
                disabled={!selected || !isSelected}>Delete</button
            >
        {/if}
    </div>
{/if}

<style>
    .liste {
        overflow: auto;
    }

    .lineList {
        border: 1px solid black;
        width: 94%;
        height: 100px;
        padding: 50px 0px 0px 20px;
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
    }
</style>
