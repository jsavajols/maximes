<script>
	// @ts-nocheck
	import Header from "../../../components/header/+header.svelte";
	import Footer from "../../../components/footer/+footer.svelte";
	import ListeMaximes from "../../../components/maxims/+list.svelte";
	import "../../../global.css";

	let author = "";
	let maxim = "";
	let result = "";
	let unique = {};
	let toBeBinded = {};

	async function doPost() {
		const res = await fetch("../api/maxims/", {
			method: "POST",
			body: JSON.stringify({
				author,
				maxim,
			}),
		});

		const json = await res.json();
		result = JSON.stringify(json);
		unique = {};
	}
</script>

<div class="page">
	<Header />
	<h1>Ajout d'une maxime</h1>
	<form class="content" on:submit={doPost}>
		<label for="auteur">Auteur</label>
		<input type="text" bind:value={author} />
		<label for="maxime">Maxime</label>
		<textarea name="maxim" rows="5" bind:value={maxim} />
	</form>

	<button type="button" on:click={doPost}> Enregistrer </button>
	<p>Result:</p>
	{#if toBeBinded.clickedId !== undefined}
		<pre>
			{toBeBinded.clickedId}
			{toBeBinded.clickedAuthor}
			{toBeBinded.clickedMaxim}
		</pre>
	{/if}


	{#key unique}
		<ListeMaximes bind:toBeBinded />
	{/key}

	<Footer />
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: 20% 80%;
	}
</style>
