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
	<img src="1clusif-logo-vertical.png" alt="Les maximes" width="30%" />
	<Wait isVisible={waitVisible} />
	<h1 style="text-align: center;">Une maxime ...</h1>
	<div class="maxim">
		{@html maxime}
	</div>
	<div class="author">
		{@html author}
	</div>
	<div>
		<button
			class="myButton bottom"
			disabled={waitVisible}
			on:click={fetchMaxime}
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
		margin-top: 5%;
		color: black;
		font-size: 2em;
	}
	.maxim {
		color: black;
		font-size: 1.8em;
	}
	.myButton {
		padding: 10px;
		font-size: large;
		border-radius: 5px;
		border-width: 1px;
		background-color: #e2f900;
		color: black;
	}
	.bottom {
		position: absolute;
		bottom: 0;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>
