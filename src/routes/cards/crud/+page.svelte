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
    <h1>Liste des cartes</h1>
    <input placeholder="Recherche des cartes" bind:value={prefix} />

    <div class="liste">
        <table style="width: 100%">
            {#each filteredcards as selectedCard, i}
                <tr
                    class={i === lineSelected ? "lineIsSelected" : ""}
                    on:click={() => listClick(selectedCard, i)}
                >
                    <td
                        style="border: 1px solid black; width: 100%"
                        align="left"
                    >
                        {selectedCard.compteur} - {selectedCard.card_text}
                    </td>
                </tr>
            {/each}
        </table>
    </div>

    <div class="saisie">
        <label
            >Contenu de la carte
            <textarea style="width:100%" placeholder="Carte" rows="5" bind:value={card} /></label
        >
    </div>

    <div class="buttons">
        <button on:click={clear} disabled={!card}>Clear</button>
        <button on:click={create} disabled={!card || isSelected}>Ajout</button>
        <button on:click={update} disabled={!card || !selected || !isSelected}
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
        clear: both;
    }
</style>
