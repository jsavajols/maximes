<script>
    // @ts-nocheck
    import { page } from '$app/stores'

    let audio;
    let filename = $page.url.searchParams.get('filename');
    function play() {
        // getAndPlayFile(filename);
        audio.src = "/api/audio-recorder?filename=" + filename + "&fromS3=true";
        audio.play();
    }

    // http://localhost:5173/audio-player?filename=uploads/audio-1695207760403.ogg
</script>

<button on:click={play}>Play</button>

<audio bind:this={audio} />
