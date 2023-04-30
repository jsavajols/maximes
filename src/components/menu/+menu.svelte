<script>
	import { menuOpen } from "../../store.js";
	let isOpen = false;
	menuOpen.subscribe((value) => {
		isOpen = value;
	});
	function closeMenu() {
		menuOpen.update((menuOpen) => !menuOpen);
	}
</script>

<aside
	class="absolute w-full h-full bg-gray-200 border-r-2 shadow-lg"
	class:isOpen
>
	<nav class="hidden text-gray-500 uppercase text-bold sm:block">
		<a href="/" class="block" on:click={closeMenu}>Accueil</a>
		<a href="/authors/crud" class="block" on:click={closeMenu}>Gérer les auteur</a>
		<a href="/maxims/crud" class="block" on:click={closeMenu}>Gérer les maximes</a>
		<a href="/cards/crud" class="block" on:click={closeMenu}>Gérer les cartes</a>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: all 0.5s;
		width: 300px;
		padding: 20px;
		z-index: 1;
	}
	.isOpen {
		left: 0px;
	}
</style>
