<script>
    export let count = 0;
    export let maxime = "";
    export let author = "";
</script>

<div class="maxim">
    <b>Maxime n° {count} : </b>
    {maxime}
</div>
<div class="author">
    <b>Auteur : </b>
    {author}
</div>

<style>
    .author {
        margin-top: 5%;
        color: black;
        font-size: 2em;
    }
    .maxim {
        color: black;
        font-size: 1.8em;
        border-style: solid;
        border-width: 2px;
        border-radius: 5px;
        padding: 10px;
    }
</style>
