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
	title.update((title) => "Application 1Clusif");
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
		isMaximeOpen = true;
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
		isCardOpen = true;
	};
	let fetchAffirm = async () => {
		maxime = "";
		messageForWait = "Recherche en cours...";
		waitVisible = true;
		let response = await fetch("api/affirm/random");
		let rep = await response.json();
		rep = rep[0];
		card = rep.affirmation;
		waitVisible = false;
		isAffirmOpen = true;
	};
	let admin = false;
	let isMaximeOpen = false;
	let isCardOpen = false;
	let isAffirmOpen = false;
</script>

<div class="vertical-center w-full mt-auto mb-auto">
	<div class="w-1/2 xs:w-full m-auto">
		<Wait isVisible={waitVisible} message={messageForWait} />
		<CardMaxime bind:isMaximeOpen {maxime} {author} visible={maxime !== ""}/>
		<CardCard bind:isCardOpen bind:isAffirmOpen card_text={card} visible={card !== ""} />
	</div>
	<div class="w-full flex flex-wrap justify-center gap-5">
		{#if !isCardOpen && !isAffirmOpen}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="cardButton" on:click={fetchMaxime} on:keydown={null}>
				<img
					class="m-auto"
					src="/open-book.svg"
					alt="Gérer les maximes"
				/>
				<div class="m-auto text-center">
					{!waitVisible ? "Voir une maxime" : "Patientez..."}
				</div>
			</div>
		{/if}
		{#if !isMaximeOpen && !isAffirmOpen}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="cardButton" on:click={fetchCard} on:keydown={null}>
				<img class="m-auto" src="/spades.svg" alt="Tirer une carte" />
				<div class="m-auto text-center">
					{!waitVisible ? "Tirer une carte" : "Patientez..."}
				</div>
			</div>
		{/if}
		{#if !isMaximeOpen && !isCardOpen}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="cardButton" on:click={fetchAffirm} on:keydown={null}>
				<img
					class="m-auto"
					src="/talk.png"
					alt="Une affirmation positive"
				/>
				<div class="m-auto text-center">
					{!waitVisible ? "Une affirmation positive" : "Patientez..."}
				</div>
			</div>
		{/if}
		{#if !isMaximeOpen && !isCardOpen && !isAffirmOpen}
			<a class="cardButton" href="/cardiac-coherence">
				<img class="m-auto" src="/wind.svg" alt="Cohérence cardiaque" />
				<div class="m-auto text-center">Cohérence cardiaque</div>
			</a>
		{/if}
		{#if admin}
			<a class="cardButton" href="/authors/crud">
				<img
					class="m-auto"
					src="/table-rows.svg"
					alt="Gérer les auteurs"
				/>
				<div class="m-auto text-center">Gérer les auteur</div>
			</a>
			<a class="cardButton" href="/maxims/crud">
				<img
					class="m-auto"
					src="/table-rows.svg"
					alt="Gérer les maximes"
				/>
				<div class="m-auto text-center">Gérer les maximes</div>
			</a>
			<a class="cardButton" href="/cards/crud">
				<img
					class="m-auto"
					src="/table-rows.svg"
					alt="Gérer les cartes"
				/>
				<div class="m-auto text-center">Gérer les cartes</div>
			</a>
		{/if}
	</div>
</div>
