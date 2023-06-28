<script>
    export let maxime = "";
    export let author = "";
    export let visible = false;
    import Modal from "../../components/modal/Modal.svelte";
    let modalOpen = false;


    let sendMail = async () => {
        await fetch("api/mails-templates/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: author,
                maxime: maxime,
                to: "Jérôme",
                mailTemplate: "template-maxime",
            }),
        });
        modalOpen = true;
    };

    const closeModal = () => {
        modalOpen = false;
        visible = false;
    };

</script>

{#if visible}
    <div class="maximeCard bg-red-200 text-gray-700">
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

        {maxime}
        <div class="mt-10 text-gray-900 font-bold hr">
            {author}
        </div>
        <div class="flex justify-end">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="w-10" on:click={sendMail} on:keydown={null}>
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            </div>
            <Modal visible={modalOpen} title="Information">
                <p>Le mail a été envoyé</p>
                <!-- svelte-ignore a11y-autofocus -->
                <button autofocus class="btn bg-blue-600" on:click={closeModal}>Ok</button>
            </Modal>
        </div>
    </div>
{/if}
