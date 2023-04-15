<script>
	import Header from "../components/header/+header.svelte";
	import Footer from "../components/footer/+footer.svelte";
	import Wait from "../components/wait/+Wait.svelte";
	import CardMaxime from "../components/cards/+maxime.svelte";
	import CardCard from "../components/cards/+card.svelte";
	import "../global.css";

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
	<Header />
	<Wait isVisible={waitVisible} message={messageForWait} />

	{#if maxime !== ""}
		<CardMaxime {maxime} {author} />
	{/if}
	{#if card !== ""}
		<CardCard card_text={card} />
	{/if}
	<div class="cards">
		<button class="card" disabled={waitVisible} on:click={fetchMaxime}
			>{!waitVisible ? "Voir une maxime" : "Patientez..."}</button
		>
		<button class="card" disabled={waitVisible} on:click={fetchCard}
			>{!waitVisible ? "Tirer une carte" : "Patientez..."}</button
		>
		<a href="/authors/crud">
			<button class="card">Gérer les auteur</button>
		</a>
		<a href="/maxims/crud">
			<button class="card">Gérer les maximes</button>
		</a>
		<a href="/cards/crud">
			<button class="card">Gérer les cartes</button>
		</a>
		{#if maxime !== ""}
			<button class="card" on:click={send}>Mail</button>
		{/if}
	</div>
</div>
<Footer />

<style>
	.card {
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
