<script>
	import Header from "../components/header/+header.svelte";
	import Footer from "../components/footer/+footer.svelte";
	import Wait from "../components/wait/+Wait.svelte";
	import CardMaxime from "../components/cards/+maxime.svelte";
	import CardCard from "../components/cards/+card.svelte";
	import "../global.css";

	let count = 0;
	let author = "";
	let maxime = "";
	let card = "";
	let waitVisible = false;
	let messageForWait = "Patientez...";
	let fetchMaxime = async () => {
		card = "";
		messageForWait = "Recherhce en cours...";
		waitVisible = true;
		let response = await fetch("api/maxims/random");
		let rep = await response.json();
		rep = rep[0];
		author = rep.author;
		maxime = rep.maxim;
		count++;
		waitVisible = false;
	};
	let fetchCard = async () => {
		maxime = "";
		messageForWait = "Recherhce en cours...";
		waitVisible = true;
		let response = await fetch("api/cards/random");
		let rep = await response.json();
		rep = rep[0];
		card = rep.card_text;
		count++;
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
		<CardMaxime count={count} maxime={maxime} author={author} />
	{/if}
	{#if card !== ""}
		<CardCard count={count} card_text={card} />
	{/if}
	<div class="grid bottom">
		<div>
			<button
				class="myButton"
				disabled={waitVisible}
				on:click={fetchMaxime}
				>{!waitVisible
					? "Une nouvelle maxime ?"
					: "Patientez..."}</button
			>
		</div>
		<div>
			<button class="myButton" disabled={waitVisible} on:click={fetchCard}
				>{!waitVisible
					? "Une nouvelle carte ?"
					: "Patientez..."}</button
			>
		</div>
		<div>
			<a href="/authors/crud">
				<button class="myButton">Ajouter auteur</button>
			</a>
		</div>
		<div>
			<a href="/maxims/crud">
				<button class="myButton">Ajouter maxime</button>
			</a>
		</div>
		<div>
			<a href="/cards/crud">
				<button class="myButton">Ajouter carte</button>
			</a>
		</div>
		{#if maxime !== ""}
			<div>
				<button class="myButton" on:click={send}>Mail</button>
			</div>
		{/if}
	</div>
</div>
<Footer />

<style>
	.myButton {
		padding: 10px;
		margin: 10px;
		font-size: large;
		border-radius: 5px;
		border-width: 1px;
		background-color: #e2f900;
		color: black;
	}
	.bottom {
		position: absolute;
		display: grid;
		grid-template-columns: auto auto auto;
		bottom: 0;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>
