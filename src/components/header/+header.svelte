<script>
    // @ts-nocheck
    import { menuOpen, title } from "../../store";
    export let menuclosed = menuOpen;
    let titleValue = "";
    function menuChange() {
        menuclosed = !menuclosed;
        menuOpen.update((menuOpen) => menuclosed);
    }
    title.subscribe((value) => {
        titleValue = value;
    });
    let admin = false;
</script>

<nav class="fixed top-0 bg-white border-gray-200 dark:bg-gray-900 w-screen">
    <div class="flex flex-wrap justify-between mx-auto pl-4 pr-4 pt-4">
        <div class="">
            <a href="/" class="flex items-center">
                <img
                    src="/1clusif-logo-vertical.png"
                    class="h-20 mr-3"
                    alt="1Clusif"
                />
            </a>
        </div>
        <div>
            <span
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                >{titleValue}</span
            >
        </div>
        <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
        >
            <svg
                on:click={menuChange}
                on:keydown={null}
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                /></svg
            >
        </button>
        <div
            class="{menuclosed ? 'hidden' : ''} w-full md:block md:w-auto"
            id="menu"
        >
            <ul
                class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
                <li>
                    <a
                        on:click={menuChange}
                        href="/"
                        class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                        aria-current="page">Home</a
                    >
                </li>
                {#if admin}
                    <li>
                        <a
                            on:click={menuChange}
                            href="/authors/crud"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Auteurs</a
                        >
                    </li>
                    <li>
                        <a
                            on:click={menuChange}
                            href="/maxims/crud"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Maximes</a
                        >
                    </li>
                    <li>
                        <a
                            on:click={menuChange}
                            href="/cards/crud"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Cartes</a
                        >
                    </li>
                    <li>
                        <a
                            on:click={menuChange}
                            href="/users/crud"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Model</a
                        >
                    </li>
                {/if}
                <li>
                    <a
                        on:click={menuChange}
                        href="/cardiac-coherence"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >Cohérence cardiaque</a
                    >
                </li>
                <li>
                    <a
                        on:click={menuChange}
                        href="/audio-recorder"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >Audio recorder</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
