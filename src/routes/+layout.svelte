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
    <div class="h-screen">
        <Header />

        <main class="p-5 bg-slate-100">
            <slot />
        </main>

        <Footer />
    </div>
{/if}
