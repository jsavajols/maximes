<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    import { title } from "../../../store.js";
    export let author = "";
    export let mode = "show";
    const dispatch = createEventDispatcher();

    const submitForm = () => {
        const formData = {
            author: author,
        };
        dispatch("submitForm", formData);
    }
    title.update((title) => "Détail d'un auteur");
</script>

<form class="w-full" on:submit|preventDefault={submitForm}>
    <label for="author">
        Nom de l'auteur
    </label>
    <div class="">
        <!-- svelte-ignore a11y-autofocus -->
        <input
            class="bg-gray-200 w-3/4 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
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

