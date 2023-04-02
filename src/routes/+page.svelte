<script>
	import Header from "../components/header/+header.svelte";
	import Wait from "../components/wait/+Wait.svelte";
	import Footer from "../components/footer/+footer.svelte";

	let count = 1;
	let author = "";
	let maxime = "";
	let waitVisible = false;
	let messageForWait = "Patientez...";
	let fetchMaxime = async () => {
		messageForWait = "Recherhce en cours...";
		waitVisible = true;
		let response = await fetch("api/maxims/random");
		let rep = await response.json();
		rep = rep[0];
		author = "<b>Auteur</b> : " + rep.author;
		maxime = "<b>Maxime n° " + count + " : </b>" + rep.maxim;
		count++;
		waitVisible = false;
	};
	let send = async () => {
		messageForWait = "Envoi du mail en cours...";
		waitVisible = true;
		fetch("api/mails-templates/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				author: author,
				maxime: maxime,
			}),
		});
		console.log()
		waitVisible = false;
	};
</script>

<div class="page">
	<Header />
	<Wait isVisible={waitVisible} message={messageForWait}/>
	<h1 style="text-align: center;">Une maxime ...</h1>
	<div class="maxim">
		{@html maxime}
	</div>
	<div class="author">
		{@html author}
	</div>
	<div class="bottom">
		<div>
			<button
				class="myButton"
				disabled={waitVisible}
				on:click={fetchMaxime}
				>{!waitVisible
					? "Une nouvelle maxime ?"
					: "Patientez..."}</button
			>
		</div>
		<div>
			<a href="/authors/add">
				<button class="myButton">Ajouter auteur</button>
			</a>
		</div>
		<div>
			<a href="/maxims/add">
				<button class="myButton">Ajouter maxime</button>
			</a>
		</div>
		<div>
			<button disabled={author===""} class="myButton" on:click={send}>Mail</button>
		</div>
	</div>
</div>
<Footer />

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
		margin: 10px;
		font-size: large;
		border-radius: 5px;
		border-width: 1px;
		background-color: #e2f900;
		color: black;
	}
	.bottom {
		position: absolute;
		display: flex;
		bottom: 0;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>
