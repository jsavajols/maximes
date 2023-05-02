<script>
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import Menu from "../components/menu/+menu.svelte";
    import "../global.css";
    import "../app.css";
    import {page} from '$app/stores';
</script>

{#if $page.url.pathname.startsWith('/test')}
    <slot />
{:else}
    <div class="app">
        <Header />
        <main>
            <Menu />
            <slot />
        </main>
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
