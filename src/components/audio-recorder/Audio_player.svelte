<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let buttonText = "Play...";
    let buttonIcon = "/play.png";
    let audio;
    let currentTime = 0;
    let maxTime = 0;

    export let filename;

    onMount(() => {
        audio.src = "/api/audio-recorder?filename=" + filename + "&fromS3=true";
        maxTime = audio.duration;
    });

    const onClick = () => {
        if (audio?.paused) audio.play();
        else audio.pause();
    };

    const audioUpdated = (e) => {
        if (e.type === "play") {
            buttonText = "Playing...";
            buttonIcon = "/pause.png";
        } else if (e.type === "pause") {
            buttonText = "Paused...";
            buttonIcon = "/play.png";
        } else if (e.type === "ended") {
            buttonText = "Play...";
            buttonIcon = "/play.png";
        }
        audio = audio;
    };

    const timeUpdate = (e) => {
        currentTime = audio.currentTime;
        maxTime = audio.duration;
    };
</script>

<audio
    bind:this={audio}
    on:pause={audioUpdated}
    on:play={audioUpdated}
    on:ended={audioUpdated}
    on:timeupdate={timeUpdate}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col items-center">
    <div class="cardButton" on:click={onClick} on:keydown={null}>
        <img class="m-auto" src={buttonIcon} alt="Ecoutez l'enregistrement" />
        <div class="m-auto text-center">
            {buttonText}
        </div>
    </div>
    <div>
        0
        <input
            disabled="true"
            type="range"
            bind:value={currentTime}
            min="0"
            max={maxTime}
        />
        {maxTime}
    </div>
</div>
