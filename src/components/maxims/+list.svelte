<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	let maxims = [];

	async function refresh() {
		const res = await fetch(`/api/maxims`);
		maxims = await res.json();
	};

	async function deleteMaxim(id) {
		await fetch(`/api/maxims/${id}`, {
			method: "DELETE",
		});
		await refresh();
	}

	onMount(async () => {
		await refresh();
	});
</script>

<div>
	<h1>Liste des maximes</h1>
	<div>
		{#each maxims as theMaxim}
			<div>
				<button on:click={ deleteMaxim(theMaxim.compteur) }> X </button>
			</div>
			<div>
				Auteur : {theMaxim.author.author}
			</div>
			<div>
				Maxime : {theMaxim.maxim}
			</div>
			<hr />
		{:else}
			<p>loading...</p>
		{/each}
	</div>
</div>
