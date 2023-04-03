<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	let authors = [];

	async function refresh() {
		const res = await fetch(`/api/authors/`);
		authors = await res.json();
	}

	onMount(async () => {
		await refresh();
	});

	async function deleteAuthor(id) {
		await fetch(`/api/authors/${id}`, {
			method: "DELETE",
		});
		await refresh();
	}
</script>

<div>
	<h1>Liste des auteurs</h1>
	<div>
		{#each authors as theAuthor}
			<div>
				<button on:click={deleteAuthor(theAuthor.compteur)}> X </button>
			</div>
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
</div>
