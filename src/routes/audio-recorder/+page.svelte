<script>
    // @ts-nocheck

    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let fileHandle;
    let audio;

    async function startRecording() {
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
            console.log("Audio Blob", savedFilename);
            audio.src = savedFilename;
            audio.play();
            audioChunks = [];
        };

        mediaRecorder.start();
    }

    async function stopRecording() {
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
            console.log("json", json.filename);
            if (json.filename) {
                localSavedFilename = json.filename;
                console.log("Audio uploaded successfully");
            } else {
                console.log("Failed to upload audio");
            }
        } catch (error) {
            console.error("There was an error uploading the file", error);
        }
        console.log("localSavedFilename", localSavedFilename);
        return localSavedFilename;
    }
</script>

<button class="btn bg-blue-600" on:click={startRecording}
    >Démarrer l'enregistrement</button
>
<button class="btn bg-blue-600" on:click={stopRecording}
    >Arrêter l'enregistrement</button
>
<audio class="btn bg-blue-600" bind:this={audio} />
