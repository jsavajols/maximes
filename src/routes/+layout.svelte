<script>
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import "../app.css";
    import { page } from "$app/stores";
    const outsidePages = ["/test", "/cc", "/audio-recorder", "/audio-player"];
</script>

{#if outsidePages.includes($page.url.pathname)}
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
