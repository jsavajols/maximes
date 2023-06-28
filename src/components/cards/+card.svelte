<script>
    export let card_text = "";
    export let visible = false;
</script>

{#if visible}
    <div class="maximeCard bg-cardColor text-gray-700">
        <div class="flex justify-end">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="w-10"
                on:click={() => {
                    visible = false;
                }}
                on:keydown={null}
            >
                <svg
                    class="cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        </div>
        {card_text}
    </div>
{/if}
