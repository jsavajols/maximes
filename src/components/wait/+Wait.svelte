<script>
	export let isVisible = false;
    export let message = "Patientez...";
</script>

<div class={ isVisible ? 'visible' : 'hidden' }>
    { message }
</div>

<style>
    .visible {
        display: block;
    }
    .hidden {
        display: none;
    }
</style>