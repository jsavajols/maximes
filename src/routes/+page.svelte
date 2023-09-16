<script>
	import Wait from "../components/wait/+Wait.svelte";
	import CardMaxime from "../components/cards/+maxime.svelte";
	import CardCard from "../components/cards/+card.svelte";
	import { menuOpen, title } from "../store.js";
	import { onMount } from "svelte";
	onMount(async () => {
		menuOpen.update((menuOpen) => false);
	});

	menuOpen.update((menuOpen) => false);
	title.update((title) => "Mes maximes");
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
</script>

<div class="">
	<Wait isVisible={waitVisible} message={messageForWait} />
	<CardMaxime {maxime} {author} visible={maxime !== ""} />
	<CardCard card_text={card} visible={card !== ""} />
	<div
		class="flex flex-wrap h-screen justify-center items-center gap-5"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="cardButton" on:click={fetchMaxime} on:keydown={null}>
			<img class="m-auto" src="/open-book.svg" alt="Gérer les maximes"/>
			<div class="m-auto text-center">
				{!waitVisible ? "Voir une maxime" : "Patientez..."}
			</div>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="cardButton" on:click={fetchCard} on:keydown={null}>
			<img class="m-auto" src="/spades.svg" alt="Tirer une carte"/>
			<div class="m-auto text-center">
				{!waitVisible ? "Tirer une carte" : "Patientez..."}
			</div>
		</div>
		<a class="cardButton" href="/authors/crud">
			<img class="m-auto" src="/table-rows.svg" alt="Gérer les auteurs"/>
			<div class="m-auto text-center">Gérer les auteur</div>
		</a>
		<a class="cardButton" href="/maxims/crud">
			<img class="m-auto" src="/table-rows.svg" alt="Gérer les maximes"/>
			<div class="m-auto text-center">Gérer les maximes</div>
		</a>
		<a class="cardButton" href="/cards/crud">
			<img class="m-auto" src="/table-rows.svg" alt="Gérer les cartes"/>
			<div class="m-auto text-center">Gérer les cartes</div>
		</a>
		<a class="cardButton" href="/cardiac-coherence">
			<img class="m-auto" src="/wind.svg" alt="Cohérence cardiaque"/>
			<div class="m-auto text-center">Cohérence cardiaque</div>
		</a>
	</div>
</div>
