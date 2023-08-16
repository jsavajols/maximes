<script>
// @ts-nocheck

    import { fly, fade } from "svelte/transition";
    export let visible = false;
    export let title = "";
</script>

{#if visible}
    <div class="modal max-w-md min-w-0 rounded-md border-2 p-3 bg-white absolute z-10" transition:fly={{ y: -200, duration: 300 }}>
        <!-- Title -->
        {#if title}
            <div class="bg-slate-200">{title}</div>
        {/if}
        <!-- Content -->
        <div>
            <slot />
        </div>
    </div>
    <div class="overlay" transition:fade={{ duration: 200 }} />
{/if}

<style>
    .modal {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }
</style>
