<script>
    export let card_text = "";
    export let visible = false;
</script>

{#if visible}
    <div class="maximeCard bg-cardColor text-gray-700">
        <div class="flex justify-end">
            <div>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                    class="w-10 cursor-pointer" 
                    src="/button_close.svg"
                    alt="close"
                    on:click={() => {
                        visible = false;
                    }}
                    on:keydown={null}
                />
            </div>
        </div>
        {card_text}
    </div>
{/if}
