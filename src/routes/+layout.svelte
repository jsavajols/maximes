<script>
    import Menu from "../components/menu/+menu.svelte";
    import Header from "../components/header/+header.svelte";
    import Footer from "../components/footer/+footer.svelte";
    import "../global.css";
</script>
<Menu />
<div class="page">
    <Header />
    <slot />
</div>
<Footer />    

