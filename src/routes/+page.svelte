<script>
    import  Wait  from '../components/wait/+Wait.svelte';
	import { page } from '$app/stores';
	let author="";
	let maxime="";
    let waitVisible = false;
	let fetchMaxime = (async () => {
        waitVisible = true;
		let url = $page.url + 'api/maxims/random';
		let response = await fetch(url);
		let rep = await response.json();
		rep = rep[0];
		author = "Auteur : " + rep.author;
		maxime = "Maxime : " + rep.maxim;
        waitVisible = false;
	})
</script>

<div>
    <Wait isVisible={ waitVisible }/>
	{ author }<br>
	{ maxime }
</div>
<div>
	<button disabled = { waitVisible } on:click={fetchMaxime}>{(!waitVisible) ? 'Une nouvelle maxime ?' : 'Patientez...'}</button>
</div>

