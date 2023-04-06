<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	let maxims = [];

	export let toBeBinded = {};

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

	function clickMaxim(theMaxim) {
		toBeBinded = {
			clickedId: theMaxim.compteur,
			clickedAuthor: theMaxim.author.author,
			clickedMaxim: theMaxim.maxim,
		}
	}

</script>

<div>
	<h1>Liste des maximes</h1>
	<div>
		{#each maxims as theMaxim}
		<div on:click={() => clickMaxim(theMaxim)}>
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
		</div>
		{:else}
			<p>loading...</p>
		{/each}
	</div>
</div>
