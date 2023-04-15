<script>
    export let count = 0;
    export let maxime = "";
    export let author = "";
</script>

<div class="maxim">
    {maxime}
    <div style="margin-top: 20px;">
        {author}
    </div>
</div>

<style>
    .author {
        margin-top: 5%;
        margin-bottom: 5%;
        color: black;
        font-size: 2em;
    }
    .maxim {
        margin-bottom: 5%;
        color: black;
        font-size: 1.8em;
        border-style: solid;
        border-width: 2px;
        border-radius: 5px;
        padding: 10px;
    }
</style>
