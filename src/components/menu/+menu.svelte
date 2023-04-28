<script>
	let active = false;
	function closeMenu() {
		active = false;
	}
</script>

<button on:click={() => (active = !active)}>
	{active ? "Close" : "Open"} Menu
</button>
<aside class:active>
	<div>
		<a href="/authors/crud">
			<button class="card" on:click={ closeMenu }>Gérer les auteur</button>
		</a>
	</div>
	<div>
		<a href="/maxims/crud">
			<button class="card" on:click={ closeMenu }>Gérer les maximes</button>
		</a>
	</div>
	<div>
		<a href="/cards/crud">
			<button class="card" on:click={ closeMenu }>Gérer les cartes</button>
		</a>
	</div>
</aside>

<style>
	aside {
		position: absolute;
		left: -500px;
		transition: all 0.5s;
		height: 500px;
		width: 300px;
		padding: 20px;
		border: 1px solid #ddd;
		background-color: #efefef;
		z-index: 1;
	}
	.active {
		left: 0px;
	}
</style>
