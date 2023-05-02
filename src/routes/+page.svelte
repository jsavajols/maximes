<script>
	import Wait from "../components/wait/+Wait.svelte";
	import CardMaxime from "../components/cards/+maxime.svelte";
	import CardCard from "../components/cards/+card.svelte";

	let author = "";
	let maxime = "";
	let card = "";
	let waitVisible = false;
	let messageForWait = "Patientez...";
	let fetchMaxime = async () => {
		card = "";
		messageForWait = "Recherche en cours...";
		waitVisible = true;
		let response = await fetch("api/maxims/random");
		let rep = await response.json();
		rep = rep[0];
		author = rep.author;
		maxime = rep.maxim;
		waitVisible = false;
	};
	let fetchCard = async () => {
		maxime = "";
		messageForWait = "Recherche en cours...";
		waitVisible = true;
		let response = await fetch("api/cards/random");
		let rep = await response.json();
		rep = rep[0];
		card = rep.card_text;
		waitVisible = false;
	};
	let send = async () => {
		messageForWait = "Envoi du mail en cours...";
		waitVisible = true;
		await fetch("api/mails-templates/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				author: author,
				maxime: maxime,
				to: "Jérôme",
				mailTemplate: "template-maxime",
			}),
		});
		author = "";
		maxime = "";
		waitVisible = false;
	};
</script>

<div class="page">
	<Wait isVisible={waitVisible} message={messageForWait} />

	{#if maxime !== ""}
		<CardMaxime {maxime} {author} />
	{/if}
	{#if card !== ""}
		<CardCard card_text={card} />
	{/if}
	<div class="flex flex-wrap -mb-4 -mx-2">
		<div class="cardButton">
			<button disabled={waitVisible} on:click={fetchMaxime}
				>{!waitVisible ? "Voir une maxime" : "Patientez..."}</button
			>
		</div>
		<div class="cardButton">
			<button disabled={waitVisible} on:click={fetchCard}
				>{!waitVisible ? "Tirer une carte" : "Patientez..."}</button
			>
		</div>
		<a class="cardButton" href="/authors/crud">
			<button>Gérer les auteur</button>
		</a>
		<a class="cardButton" href="/maxims/crud">
			<button>Gérer les maximes</button>
		</a>
		<a class="cardButton" href="/cards/crud">
			<button>Gérer les cartes</button>
		</a>
			{#if maxime !== ""}
				<button class="cardButton" on:click={send}>Mail</button>
			{/if}
	</div>
</div>

<style>
	.card2 {
		background-color: #e2f900;
		padding: 1rem;
		height: 8rem;
		width: 100%;
		font-size: x-large;
		cursor: pointer;
	}
	.cards {
		max-width: 1024px;
		margin: 0 auto;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
