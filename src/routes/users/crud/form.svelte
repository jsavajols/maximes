<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    export let user = "";
    export let mode = "show";
    const dispatch = createEventDispatcher();

    const submitForm = () => {
        const formData = {
            user: user,
        };
        dispatch("submitForm", formData);
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="user">
        User
    </label>
    <div class="my-20">
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="user"
            name="user"
            type="text"
            bind:value={user}
            autofocus
            disabled={mode == "show"}
            placeholder="User"
        />
    </div>
</form>
