<script>
    import Header from "../../../components/header/+header.svelte";
    import Footer from "../../../components/footer/+footer.svelte";
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
    let result = "";
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
        result = JSON.stringify(json);
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
        result = JSON.stringify(json);
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

<div class="page">
    <Header />
    {#if lineSelected === -1}
        <div
            class="button-add"
            style="cursor:pointer"
            on:click={add}
            on:keydown={null}
        >
            <img src="/button_add.png" alt="add" width="25%" />
        </div>

        <label
            >Rechercher une carte<input
                placeholder="Recherche des cartes"
                bind:value={prefix}
            /></label
        >

        <div class="liste">
            {#each filteredcards as selectedCard, i}
                <div
                    class={i === lineSelected ? "lineIsSelected" : ""}
                    on:click={() => listClick(selectedCard, i)}
                    on:keydown={null}
                >
                    <div class="lineList">
                        {selectedCard.compteur} - {selectedCard.card_text}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="saisie">
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

        <div class="buttons">
            <button on:click={clearForm} disabled={!card}>Clear</button>
            <button on:click={create} disabled={!card || isSelected}>Add</button
            >
            <button
                on:click={update}
                disabled={!card || !selected || !isSelected}>Update</button
            >
            <button on:click={remove} disabled={!selected || !isSelected}
                >Delete</button
            >
        </div>
        <div style="cursor:pointer" on:click={list} on:keydown={null}>
            <img src="/button_back.png" alt="back" width="10%" />
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
</style>
