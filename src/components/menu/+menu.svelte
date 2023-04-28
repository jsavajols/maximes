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
	<div style="flex:2; display:flex; flex-flow:column">
		<button class="menuButton" on:click={ closeMenu }>Close menu</button>
		<a href="/authors/crud">
			<button class="menuButton" on:click={ closeMenu }>Gérer les auteur</button>
		</a>
		<a href="/maxims/crud">
			<button class="menuButton" on:click={ closeMenu }>Gérer les maximes</button>
		</a>
		<a href="/cards/crud">
			<button class="menuButton" on:click={ closeMenu }>Gérer les cartes</button>
		</a>
	</div>
</aside>

<style>
	aside {
		position: fixed;
		top: 0;
		left: -500px;
		transition: all 0.5s;
		height: 500px;
		width: 300px;
		padding: 20px;
		border: 1px solid #ddd;
		background-color: #efefef;
		z-index: 9999;
	}
	.active {
		left: 0px;
	}
	.menuButton {
		background-color: #efefef;
		margin-bottom: 2rem;
		height: 4rem;
		width: 100%;
		font-size: large;
		cursor: pointer;
	}
</style>
