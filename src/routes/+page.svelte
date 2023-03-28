<script>
    import  Wait  from '../components/wait/+Wait.svelte';
	let author="";
	let maxime="";
    let waitVisible = false;
	let fetchMaxime = (async () => {
        waitVisible = true;
		let response = await fetch('https://happyapi.fr/api/getMaxime');
		let rep = await response.json();
		author = "Auteur : " + rep.result.author;
		maxime = "Maxime : " + rep.result.maxim;
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

