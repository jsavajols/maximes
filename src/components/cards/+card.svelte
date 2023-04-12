<script>
    export let count = 0;
    export let card_text = "";
</script>

<div class="card">
    <b>Carte n° {count} : </b>
    {card_text}
</div>

<style>
    .card {
        margin-bottom: 5%;
        color: black;
        font-size: 1.8em;
        border-style: solid;
        border-width: 2px;
        border-radius: 5px;
        padding: 10px;
    }
</style>
