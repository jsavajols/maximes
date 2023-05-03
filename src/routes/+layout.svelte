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
    <Header />

    <div class="md:px-16 sm:px-5 bg-gray-100">
        <div class="grid md:grid-cols-6">
            <div class="bg-white md:col-span-1 md:flex md:justify-start">
                <Menu />
            </div>
            <div class="md:px-16 sm:px-10 xs:px-5 bg-gray-100 md:col-span-5">
                <main class="p-5">
                    <slot />
                </main>
            </div>
        </div>
    </div>
    <Footer />
{/if}
