<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { title } from "../../store.js";

    let audio;
    let cycle = 0;
    let showCycle = 0;
    let maxCycles = 30;
    let cycleType = "";
    let buttonText = "Start...";
    let buttonIcon = "/start.png";
    let started = false;
    let timeoutIds = [];

    onMount(() => {
        title.update((title) => "Cohérence cardiaque");
    });
    $: if (cycle === maxCycles) {
        setTimeout(() => {
            cycleType = "end";
            end();
        }, 5000);
    }

    function inspire() {
        showCycle++;
        cycleType = "Inspirez";
        audio.src = "sounds/inspire.aac";
        audio.play();
    }

    function expire() {
        cycleType = "Expirez";
        audio.src = "sounds/expire.aac";
        audio.play();
        cycle++;
    }

    function end() {
        cycleType = "Fin";
        audio.src = "sounds/end.aac";
        audio.play();
    }

    function playClycle() {
        inspire();
        setTimeout(() => {
            if (started) {
                expire();
            }
        }, 5000);
    }

    function clicked() {
        if (started) {
            for (let i = 0; i < timeoutIds.length; i++) {
                clearTimeout(timeoutIds[i]);
            }
            cycle=0;
            showCycle=0;
            started = false;
            cycleType = "";
            buttonText = "Start...";
            buttonIcon = "/start.png";
        } else {
            started = true;
            cycle = 0;
            showCycle = 0;
            buttonText = "Stop";
            buttonIcon = "/stop.png";
            for (let i = 0; i < maxCycles; i++) {
                let timeoutId = setTimeout(() => {
                    playClycle();
                }, i * 10000);
                timeoutIds.push(timeoutId);
            }
        }
    }
</script>

<div class="mt-20 ml-5 mr-5 flex flex-col justify-center items-center gap-5">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="cardButton" on:click={clicked} on:keydown={null}>
        <img class="m-auto" src={buttonIcon} alt="Cohérence cardiaque"/>
        <div class="m-auto text-center">
            {buttonText}
        </div>
    </div>

    <audio class="btn bg-blue-600" bind:this={audio} />

    <div class="text-4xl">
        <h1>{cycleType}</h1>
    </div>

    <div>
        {showCycle}
        <input
            disabled="true"
            type="range"
            id={cycle}
            bind:value={cycle}
            min="0"
            max={maxCycles}
        />
        {maxCycles}
    </div>
</div>
