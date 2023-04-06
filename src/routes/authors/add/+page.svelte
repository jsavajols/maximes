<script>
	// @ts-nocheck
	import Header from "../../../components/header/+header.svelte";
	import Footer from "../../../components/footer/+footer.svelte";
	import ListeAuthors from "../../../components/authors/+list.svelte";
	import "../../../global.css";

	let author = "";
	let result = "";
	let toBeBinded = {};
	// @ts-ignore
	let unique = {};
	let updateMode = false;

	async function doPost() {
		const res = await fetch("../api/authors/", {
			method: "POST",
			body: JSON.stringify({
				author,
			}),
		});
		const json = await res.json();
		result = JSON.stringify(json);
		updateMode = false;
		unique = {};
	}
	async function doPut(toBeBinded) {
		let Id = toBeBinded.clickedId;
		const res = await fetch("../api/authors/", {
			method: "PUT",
			body: JSON.stringify({
				Id,
				author,
			}),
		});
		const json = await res.json();
		result = JSON.stringify(json);
		updateMode = false;
		doClear();
		unique = {};
	}

	function doClear() {
		author = "";
	}

	$: if (
		!updateMode &&
		toBeBinded.clickedAuthor !== undefined &&
		author !== toBeBinded.clickedAuthor
	) {
		author = toBeBinded.clickedAuthor;
		updateMode = true;
	}
</script>

<div class="page">
	<Header />
	<h1>Ajout d'un auteur</h1>
	<form class="content" on:submit={doPost}>
		<label for="auteur">Auteur</label>
		<input name="auteur" type="text" bind:value={author} />
	</form>

	<button type="button" on:click={doClear}> Clear </button>

	{#if !updateMode}
		<button type="button" on:click={doPost}> Ajouter </button>
	{/if}

	{#if toBeBinded.clickedId !== undefined}
		<button type="button" on:click={doPut(toBeBinded)}> Maj </button>
	{/if}
	<p>Result:</p>
	{#if toBeBinded.clickedId !== undefined}
		<pre>
			{toBeBinded.clickedId}
			{toBeBinded.clickedAuthor}
		</pre>
	{/if}
	{#key unique}
		<ListeAuthors bind:toBeBinded />
	{/key}
	<Footer />
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: 20% 80%;
	}
</style>
