<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { title } from "../../store.js";

    let audio;
    let cycle = 0;
    let showCycle = 0;
    let maxCycles = 30;
    let cycleType = "";

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
            expire();
        }, 5000);
    }

    function startPlay() {
        cycle = 0;
        showCycle = 0;
        for (let i = 0; i < maxCycles; i++) {
            setTimeout(() => {
                playClycle();
            }, i * 10000);
        }
    }

    function stopPlay() {
        audio.pause();
    }

    function rewind() {
        audio.currentTime = 0;
        cycle = 0;
        startPlay();
    }
</script>
<div class="flex flex-wrap h-screen justify-center items-center gap-5">
    <div class="mt-10">
        <button class="cardButton" on:click={startPlay}> start </button>
    </div>
    <div class="mt-10">
        <button class="btn bg-blue-600" on:click={stopPlay}> stop </button>
    </div>
    <div class="mt-10">
        <button class="btn bg-blue-600" on:click={rewind}> rewind </button>
    </div>
    
    <audio class="btn bg-blue-600" bind:this={audio} />
    
    <div class="text-4xl">
        <h1>{showCycle}</h1>
    
        <h1>{cycleType}</h1>
    </div>    
</div>
