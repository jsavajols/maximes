<script>
	// @ts-nocheck

	export let showModal; // boolean
	export let action = "close";
	export let params = {};

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<!-- Title -->
		{#if params.title}
			<h1>{params.title}</h1>
		{/if}
		<!-- Content -->
		<slot>{params.content}</slot>
		<hr />
		<!-- Buttons -->
		<div class="mt-5 flex justify-between">
			{#if params.abortButton}
				<button
					class="btn bg-blue-600"
					autofocus
					on:click={() => {action = "close"; dialog.close()}}>Abort</button
				>
			{/if}
			{#if params.validateButton}
				<button
					class="btn bg-red-600"
					autofocus
					on:click={() => {action="validate"; dialog.close()}}>Validate</button
				>
			{/if}
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
