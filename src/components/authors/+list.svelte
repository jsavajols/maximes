<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	let authors = [];

	export let clickedId = 0;

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

	function clickAuthor(id) {
		clickedId = id;
	}
</script>

<div>
	<h1>Liste des auteurs</h1>
	<button on:click={refresh}>Refresh</button>
	<div>
		{#each authors as theAuthor}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => clickAuthor(theAuthor.compteur)}>
				<div>
					<button on:click={deleteAuthor(theAuthor.compteur)}>
						X
					</button>
				</div>
				<div>
					Id : {theAuthor.Id}
				</div>
				<div>
					<b>Auteur :</b>
					{theAuthor.author}
				</div>
				<hr />
			</div>
		{:else}
			<!-- this block renders when photos.length === 0 -->
			<p>loading...</p>
		{/each}
	</div>
</div>
