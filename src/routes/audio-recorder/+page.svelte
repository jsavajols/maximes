<script>
    import Audio_recorder from "../../components/audio-recorder/Audio_recorder.svelte";
</script>

<div class="flex h-screen">
    <div class="m-auto">
        <div class="w-screen">
            <Audio_recorder />
        </div>
        <div class="fixed bottom-0 w-screen grid justify-items-end">
            <div>
                <a href="/audio-recorder">
                    <img class="h-20" src="/wavly.png" alt="wavly" />
                </a>
            </div>
        </div>
    </div>
</div>
