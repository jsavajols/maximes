<script>
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import "../global.css";
</script>
<div class="page">
    <Header />
    <slot />
</div>
<Footer />    

