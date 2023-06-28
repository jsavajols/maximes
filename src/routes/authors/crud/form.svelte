<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    export let author = "";
    export let mode = "show";
    const dispatch = createEventDispatcher();

    const submitForm = () => {
        const formData = {
            author: author,
        };
        dispatch("submitForm", formData);
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="author">
        Nom de l'auteur
    </label>
    <div class="my-20">
        <!-- svelte-ignore a11y-autofocus -->
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            name="author"
            type="text"
            bind:value={author}
            autofocus
            disabled={mode == "show"}
            placeholder="Nom de l'auteur"
        />
    </div>
</form>
