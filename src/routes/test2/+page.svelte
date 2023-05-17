<script>
    // @ts-nocheck

    import Modal from "./Modal.svelte";
    let showModal = false;
    let action = "";
    let params = {};
</script>

<button
    class="btn bg-blue-600"
    on:click={() => {
        action = "";
        params = { title: "toto", content:"Validez vous ?", abortButton: true, validateButton: true };
        showModal = true;
    }}
>
    show modal
</button>
<h1>{action}</h1>

<Modal bind:showModal bind:action bind:params></Modal>
