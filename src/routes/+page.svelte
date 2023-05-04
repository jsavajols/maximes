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

<div class="">
	<Wait isVisible={waitVisible} message={messageForWait} />

	{#if maxime !== ""}
		<CardMaxime {maxime} {author} />
	{/if}
	{#if card !== ""}
		<CardCard card_text={card} />
	{/if}
	<div class="flex flex-wrap gap-5 justify-center pt-10 align-middle">
		<div class="cardButton" on:click={fetchMaxime} on:keydown={null}>
			<div class="m-auto text-center" 
				>{!waitVisible ? "Voir une maxime" : "Patientez..."}</div>
		</div>
		<div class="cardButton" on:click={fetchCard} on:keydown={null}>
			<div class="m-auto text-center" 
				>{!waitVisible ? "Tirer une carte" : "Patientez..."}</div>
		</div>
		<a class="cardButton" href="/authors/crud">
			<div class="m-auto text-center">Gérer les auteur</div>
		</a>
		<a class="cardButton" href="/maxims/crud"> <div class="m-auto text-center">Gérer les maximes</div> </a>
		<a class="cardButton" href="/cards/crud"> <div class="m-auto text-center">Gérer les cartes</div> </a>
		{#if maxime !== ""}
			<div class="cardButton" on:click={send} on:keydown={null}><div class="m-auto text-center">Mail</div></div>
		{/if}
	</div>
</div>
