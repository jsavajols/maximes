<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Audio_player from "../../components/audio-recorder/Audio_player.svelte";
    let filename = $page.url.searchParams.get("filename");

    function answer() {
        goto("/audio-recorder");
    }

</script>

<div class="grid h-screen">
    <div class="m-auto">
        <div class="w-screen">
            <Audio_player { filename }/>
        </div>
        <div class="mt-10 grid justify-items-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={answer}>
                Answer with Wavly
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
