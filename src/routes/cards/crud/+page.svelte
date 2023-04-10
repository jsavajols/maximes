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
    }

    async function remove() {
        await fetch(`/api/cards/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredcards.length - 2);
        await refresh();
    }

    function clear() {
        card = "";
        isSelected = false;
    }
    
    // @ts-ignore
    function reset_inputs(selectedCard) {
        card = selectedCard ? selectedCard.card_text : "";
        isSelected = true;
    }
</script>

<div class="page">
    <Header />
    <h1>Liste des cartes</h1>
    <input placeholder="Recherche des cartes" bind:value={prefix} />

    <select bind:value={i} size={15}>
        {#each filteredcards as selectedCard, i}
            <option value={i}>{selectedCard.compteur} {selectedCard.card_text}</option>
        {/each}
    </select>

    <label><textarea placeholder="Carte" rows="5" bind:value={card} /></label>

    <div class="buttons">
        <button on:click={clear} disabled={!card}>Clear</button>
        <button on:click={create} disabled={!card || isSelected}>Ajout</button>
        <button on:click={update} disabled={!card || !selected || !isSelected}>Modification</button
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
