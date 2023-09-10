<script>
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import "../app.css";
    import { page } from "$app/stores";
</script>

{#if $page.url.pathname.startsWith("/test")}
    <slot />
{:else}
    <div class="">
        <Header />
        <main class="lg:mx-20">
            <slot />
        </main>
        <Footer />
    </div>
{/if}
