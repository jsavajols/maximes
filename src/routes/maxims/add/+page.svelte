<script>
	import { onMount } from 'svelte';
	let author = '';
	let maxim = '';
	let result = '';
	let maxims = [];
	
	async function doPost () {
		const res = await fetch('../api/maxims/', {
			method: 'POST',
			body: JSON.stringify({
				author,
				maxim
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
	}
	onMount(async () => {
		const res = await fetch(`/api/maxims`);
		maxims = await res.json();
	});
</script>


<h1>Ajout d'une maxime</h1>
<form class="content">
  <label for="auteur">Auteur</label>
  <input type="text" bind:value={author} />
  <label for="maxime">Maxime</label>
  <input type="text" bind:value={maxim} />
</form>

<button type="button" on:click={doPost}>
	Enregistrer
</button>
<p>
	Result:
</p>
<pre>
{result}
</pre>

<div>
	<a href="/">
		<button>Home</button>
	</a>
</div>

<h1>Liste des maximes</h1>
<div>
	{#each maxims as theMaxim}
		<div>
			Auteur  : {theMaxim.author.author}
		</div>
		<div>
			Maxime : {theMaxim.maxim}
		</div>
		<hr>
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>loading...</p>
	{/each}
</div>
