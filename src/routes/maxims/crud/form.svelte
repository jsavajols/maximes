<script>
    // @ts-nocheck
    import AuthorsList from "../../../components/lists/AuthorsList.svelte";
    import { createEventDispatcher } from "svelte";
    import { title } from "../../../store.js";
    export let author = "";
    export let maxim = "";
    export let mode = "show";
    let selectedValue = "";

    console.log(author === "");
    $: author = (!author) ? selectedValue.Id : author;

    const dispatch = createEventDispatcher();

    const submitForm = () => {
        const formData = {
            card: card,
        };
        dispatch("submitForm", formData);
    };
    title.update((title) => "Détail d'une maxime");
</script>

<div>
    {#if mode === "add"}
        <div class="mt-10">
            <AuthorsList bind:selectedValue />
        </div>
    {/if}
    <div>
        <form on:submit|preventDefault={submitForm}>
            <div class="w-full my-5">
                <label  for="author"
                    >Nom de l'auteur : 
                    </label>
                    <input
                        disabled={true}
                        id="author"
                        name="author"
                        bind:value={author}
                        placeholder="Auteur"
                    />
            </div>

            <h1 class="w-full bg-white">Maxime</h1>
            <!-- svelte-ignore a11y-autofocus -->
            <textarea
                class="bg-gray-200 w-3/4 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
                rows="5"
                id="maxim"
                name="maxim"
                bind:value={maxim}
                disabled={mode == "show"}
                autofocus
                placeholder="Maxime"
            />
        </form>
    </div>
</div>
