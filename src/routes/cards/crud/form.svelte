<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    export let card = "";
    export let mode = "show";
    const dispatch = createEventDispatcher();

    const submitForm = () => {
        const formData = {
            card: card,
        };
        dispatch("submitForm", formData);
    };
</script>

<form class="w-full" on:submit|preventDefault={submitForm}>
    <label for="card">Contenu de la carte </label>
    <!-- svelte-ignore a11y-autofocus -->
    <div class="">
        <textarea
            class="bg-gray-200 w-3/4 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
            rows="5"
            id="card"
            name="card"
            type="text"
            bind:value={card}
            disabled={mode == "show"}
            autofocus
            placeholder="Carte"
        />
    </div>
</form>
