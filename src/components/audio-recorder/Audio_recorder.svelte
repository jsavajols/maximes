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
            audioBlob = new Blob(audioChunks, { type: "audio/wav" });
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
        formData.append("audio", blob, "recording.wav");

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
<div class="flex flex-col items-center">
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
            <div class="border-2 rounded-md p-5">
                {linkToAudio}
            </div>
            <div class="m-5 flex justify-between">
                <div>
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        on:click={copyLink}>Copy link</button
                    >
                </div>
                <div>
                    <a
                        href="mailto:?subject=Audio%20Recorder&body={linkToAudio}"
                        ><button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >Send by mail</button
                        ></a
                    >
                </div>
            </div>
        </div>
    {/if}
</div>
