<script>
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import Menu from "../components/menu/+menu.svelte";
    import "../global.css";
    import "../app.css";
    import { page } from "$app/stores";
</script>

{#if $page.url.pathname.startsWith("/test")}
    <slot />
{:else}
    <div class="md:px-16 sm:px-5 py-6 bg-gray-100 h-full">
        <Header />
        <div class="grid md:grid-cols-6">
            <div class="md:col-span-1 md:flex md:justify-end">
                <Menu  />
            </div>
            <div class="md:px-16 sm:px-10 xs:px-5 py-6 bg-gray-100 md:col-span-5">
                <main class="relative">
                    <slot />
                </main>
            </div>
        </div>
        <Footer />
    </div>
{/if}

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
