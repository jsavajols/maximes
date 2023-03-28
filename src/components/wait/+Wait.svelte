<script>
	export let isVisible = false;
</script>

<div class={ isVisible ? 'visible' : 'hidden' }>
    Patientez....
</div>

<style>
    .visible {
        display: block;
    }
    .hidden {
        display: none;
    }
</style>