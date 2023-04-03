<script>
	// @ts-nocheck
	import Header from "../../../components/header/+header.svelte";
	import Footer from "../../../components/footer/+footer.svelte";
	import ListeAuthors from "../../../components/authors/+list.svelte";
	import "../../../global.css";

	let author = "";
	let result = "";
	let clickedId = 0;
	// @ts-ignore
	let unique = {}

	async function doPost() {
		console.log(unique);
		const res = await fetch("../api/authors/", {
			method: "POST",
			body: JSON.stringify({
				author,
			}),
		});
		const json = await res.json();
		result = JSON.stringify(json);
		unique = {}
	}
</script>

<div class="page">
	<Header />
	<h1>Ajout d'un auteur</h1>
	<form class="content" on:submit={doPost}>
		<label for="auteur">Auteur</label>
		<input name="auteur" type="text" bind:value={author} />
	</form>

	<button type="button" on:click={doPost}> Enregistrer </button>
	<p>Result:</p>
	<pre>
{clickedId}
</pre>
	{#key unique}
		<ListeAuthors bind:clickedId />
	{/key}
	<Footer />
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: 20% 80%;
	}
</style>
