<script>
    // @ts-nocheck
    import { page } from "$app/stores";

    let buttonText = "Play...";
    let buttonIcon = "/play.png";
    let state = "";
    let audio;
    let timeForResume = 0;
    let filename = $page.url.searchParams.get("filename");
    function startPlaying() {
        audio.src = "/api/audio-recorder?filename=" + filename + "&fromS3=true";
        if (state === "paused") {
            state = "resumed";
            audio.time = timeForResume;
        } else {
            audio.play();
            state = "started";
        }
        audio.play();
        buttonText = "Playing...";
    }

    async function stopPlaying() {
        console.log(state);
        if (state === "paused") {
            audio.time = 0;
            state = "ended";
            buttonText = "End...";
        } else {
            audio.pause();
            timeForResume = audio.time;
            state = "paused";
            buttonText = "Paused...";
        }
    }

    function startStop() {
        if (state === "started" || state === "resumed") {
            stopPlaying();
        } else {
            startPlaying();
        }
    }

</script>

<audio bind:this={audio} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="mt-20 ml-5 mr-5 flex flex-col justify-center items-center gap-5">
    <div class="cardButton" on:click={startStop} on:keydown={null}>
        <img class="m-auto" src={buttonIcon} alt="Commencez l'enregistrement" />
        <div class="m-auto text-center">
            {buttonText}
        </div>
    </div>
</div>
