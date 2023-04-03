<script>
	// @ts-nocheck
	import Header from "../../../components/header/+header.svelte";
	import Footer from "../../../components/footer/+footer.svelte";
	import '../../../global.css' 


	import { onMount } from "svelte";
	let author = "";
	let result = "";
	// @ts-ignore
	let authors = [];

	async function doPost() {
		const res = await fetch("../api/authors/", {
			method: "POST",
			body: JSON.stringify({
				author,
			}),
		});
		const json = await res.json();
		result = JSON.stringify(json);
	}

	onMount(async () => {
		const res = await fetch(`/api/authors/`);
		authors = await res.json();
	});
</script>

<div class="page">
	<Header />
	<h1>Ajout d'un auteur</h1>
	<form class="content">
		<label for="auteur">Auteur</label>
		<input name="auteur" type="text" bind:value={author} />
	</form>

	<button type="button" on:click={doPost}> Enregistrer </button>
	<p>Result:</p>
	<pre>
{result}
</pre>

	<div>
		<a href="/">
			<button>Home</button>
		</a>
	</div>

	<h1>Liste des auteurs</h1>
	<div>
		{#each authors as theAuthor}
			<div>
				Id : {theAuthor.Id}
			</div>
			<div>
				<b>Auteur :</b>
				{theAuthor.author}
			</div>
			<hr />
		{:else}
			<!-- this block renders when photos.length === 0 -->
			<p>loading...</p>
		{/each}
	</div>

	<Footer />
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: 20% 80%;
	}
</style>
