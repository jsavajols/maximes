<script>
	import Wait from "../components/wait/+Wait.svelte";
	import { page } from "$app/stores";
	let count = 1;
	let author = "";
	let maxime = "";
	let waitVisible = false;
	let fetchMaxime = async () => {
		waitVisible = true;
		let url = $page.url + "api/maxims/random";
		let response = await fetch(url);
		let rep = await response.json();
		rep = rep[0];
		author = "<b>Auteur</b> : " + rep.author;
		maxime = "<b>Maxime n° " + count + " : </b>" + rep.maxim;
		count++;
		waitVisible = false;
	};
</script>

<div class="page">
	<div class="page">
		<img src="1clusif-logo-vertical.png" alt="Les maximes" width="30%" />
		<h1>Une maxime</h1>
		<Wait isVisible={waitVisible} />
		{@html author}<br />
		{@html maxime}
	</div>

	<div>
		<button class="myButton" disabled={waitVisible} on:click={fetchMaxime}
			>{!waitVisible ? "Une nouvelle maxime ?" : "Patientez..."}</button
		>
	</div>
</div>

<style>
	.page {
		padding: 1em;
		max-width: 600px;
		margin: 0 auto;
	}
	.myButton {
		margin-top: 20px;
		color: brown;
	}
</style>
