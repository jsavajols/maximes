<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Input from "./Input.svelte";

    export let selectedValue = {};
    let menuOpen = false;
    let inputValue = "";
    $: console.log(inputValue);
    $: console.log(selectedValue);

    let menuItems = [];
    let filteredItems = [];

    const handleInput = () => {
        return (filteredItems = menuItems.filter((item) =>
            item.author.toLowerCase().match(inputValue.toLowerCase())
        ));
    };

    async function refresh() {
        const res = await fetch(`/api/authors/getList`);
        menuItems = await res.json();
    }

    onMount(async () => {
        await refresh();
    });
</script>

<section class="dropdown">
    <!-- Dropdown menu -->
    <button
        on:click={() => (menuOpen = !menuOpen)}
        {menuOpen}
        data-dropdown-toggle="dropdown"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        >Liste des auteurs <svg
            class="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            /></svg
        ></button
    >

    <div
        id="myDropdown"
        class:show={menuOpen}
        class="dropdown-content max-h-80 overflow-auto"
    >
        <Input bind:inputValue on:input={handleInput} />
        <!-- MENU -->
        <ul class="">
            {#if filteredItems.length > 0}
                {#each filteredItems as item}
                <li class="h-10"
                        on:click={() => {
                            selectedValue = item;
                            menuOpen = false;
                        }}
                        on:keydown={null}
                    >
                        {item.author}
                    </li>
                {/each}
            {:else}
                {#each menuItems as item}
                    <li class="h-10"
                        on:click={() => {
                            selectedValue = item;
                            menuOpen = false;
                        }}
                        on:keydown={null}
                    >
                        {item.author}
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</section>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f6f6f6;
        min-width: 230px;
        border: 1px solid #ddd;
        z-index: 1;
    }

    /* Show the dropdown menu */
    .show {
        display: block;
    }
</style>
