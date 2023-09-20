<script>
    // @ts-nocheck

    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let linkToAudio = "";
    let audio;
    let buttonText = "Start...";
    let buttonIcon = "/record.png";
    let started = false;
    const maxRecordTime = 60000;
    let timeRecorded = 0;
    let controlRecorder;
    let controlSecondsRecorder;

    function startStop() {
        if (started) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    async function startRecording() {
        // Temps d'enregistrement de 1 minute maximum
        controlRecorder = setInterval(() => {
            stopRecording();
        }, maxRecordTime);
        controlSecondsRecorder = setInterval(() => {
            timeRecorded++;
        }, 1000);

        started = true;
        linkToAudio = "";
        buttonText = "Started...";
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            audioBlob = new Blob(audioChunks, { type: "audio/ogg" });
            // Sauvegarder sur le serveur
            const savedFilename = await uploadToServer(audioBlob);
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            audio.src = "/api/audio-recorder?filename=" + savedFilename;
            audio.play();
            audioChunks = [];
            linkToAudio =
                window.location.origin +
                "/audio-player?filename=" +
                savedFilename;
        };
        mediaRecorder.start();
    }

    async function stopRecording() {
        buttonText = "Stoped...";
        started = false;
        clearInterval(controlSecondsRecorder);
        clearInterval(controlRecorder);
        timeRecorded = 0;
        mediaRecorder.stop();
    }

    async function uploadToServer(blob) {
        const formData = new FormData();
        let localSavedFilename = "";
        formData.append("audio", blob, "recording.ogg");

        try {
            const response = await fetch("/api/audio-recorder", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();
            if (json.filename) {
                localSavedFilename = json.filename;
            } else {
                console.log("Failed to upload audio");
            }
        } catch (error) {
            console.error("There was an error uploading the file", error);
        }
        return localSavedFilename;
    }
    function copyLink() {
        navigator.clipboard.writeText(linkToAudio);
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
    <div>
        {timeRecorded}
        <input
            disabled="true"
            type="range"
            id={timeRecorded}
            bind:value={timeRecorded}
            min="0"
            max={maxRecordTime / 1000}
        />
        {maxRecordTime / 1000}
    </div>
    {#if linkToAudio !== ""}
        <div>
            {linkToAudio}
            <button class="btn bg-blue-600" on:click={copyLink}>Copy</button>
            <a href="mailto:?subject=Audio%20Recorder&body={linkToAudio}"><button class="btn bg-blue-600">Mail</button></a>
        </div>
    {/if}
</div>
