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
		<h1>Une maxime ...</h1>
		<Wait isVisible={waitVisible} />
		<div class="author">
			{@html author}
		</div>
		<div class="maxim">
			{@html maxime}
		</div>
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
	.author {
		color: black;
		font-size: 2em;
	}
	.maxim {
		margin-top: 5%;
		color: black;
		font-size: 2em;
	}
	.myButton {
		margin-top: 20px;
		padding: 5px;
		font-size: large;
		border-radius: 5px;
		border-width: 1px;
		background-color: #E2F900;
		color: black;
	}
</style>
