<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import Form from "./form.svelte";
    import Modal from "../../../components/modal/Modal.svelte";

    let modalOpen = false;
    let deleteInProgress;
    let prefix = "";
    let user = "";
    let error = "";
    let i = 0;
    let lineSelected = -1;
    let mode = "show";
    let recordsusers = [];

    onMount(async () => {
        await refreshList();
        clearValues();
    });

    const openModal = () => {
        modalOpen = true;
    };

    const closeModal = () => {
        modalOpen = false;
        error = null;
        deleteInProgress = false;
    };

    $: filteredusers = prefix
        ? recordsusers.filter((selecteduser) => {
              const name = `${selecteduser.user}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : recordsusers;

    $: selected = filteredusers[i];
    $: reset_inputs(selected);

    async function validateForm(event) {
        user = event.detail.user;
        if (user) {
            if (mode === "update") {
                await updateRecord();
            } else {
                await createRecord();
            }
        }
    }

    async function refreshList() {
        const res = await fetch(`/api/users/`);
        recordsusers = await res.json();
        lineSelected = -1;
        mode = "show";
    }

    async function createRecord() {
        i = recordsusers.length - 1;
        const passeduser = user;
        const res = await fetch("../api/users/", {
            method: "POST",
            body: JSON.stringify({
                user,
            }),
        });
        const json = await res.json();
        if (json.error) {
            error = json.error;
            modeAdd();
            user = passeduser;
        } else {
            await refreshList();
            clearValues();
            lineSelected = -1;
        }
    }

    async function updateRecord() {
        selected.user = user;
        const Id = selected.compteur;
        const res = await fetch("../api/users/", {
            method: "PUT",
            body: JSON.stringify({
                Id,
                user,
            }),
        });
        const json = await res.json();
        clearValues();
        await refreshList();
        lineSelected = -1;
    }

    async function deleteRecord(theFiltereduser) {
        mode = "delete";
        selected = theFiltereduser;
        deleteInProgress = await fetch(`/api/users/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredusers.length - 2);
        await refreshList();
    }

    function clearValues() {
        user = "";
        lineSelected = -1;
    }

    function modeAdd() {
        mode = "add";
        clearValues();
        lineSelected = 0;
    }

    function reset_inputs(selecteduser) {
        user = selecteduser ? selecteduser.user : "";
    }

    function listClick(theFiltereduser, lineNumber) {
        error = "";
        selected = theFiltereduser;
        lineSelected = lineNumber;
    }
</script>

{#if lineSelected === -1 || mode === "delete"}
    <div
        on:click={modeAdd}
        on:keydown={null}
        data-dial-init
        class="fixed right-6 bottom-6 group"
    >
        <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
            <svg
                aria-hidden="true"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                /></svg
            >
            <span class="sr-only">Ajouter</span>
        </button>
    </div>

    <div class="bg-white top-24 w-screen">
        <input placeholder="Recherche des users" bind:value={prefix} />
        <div>
            {filteredusers.length} users
        </div>
    </div>
    <!-- List begins -->
    {#each filteredusers as selecteduser, i}
        <!-- Each line -->
        <div
            class="listItem hover:bg-teal-200 hover:transition ease-out duration-500"
            on:click={() => {
                listClick(selecteduser, i);
            }}
            on:keydown={null}
        >
            <!-- Card content -->
            <div class="h-10">
                {selecteduser.user}
            </div>
            <!-- Commands -->
            <div class="flex flex-row justify-between">
                <div />
                <div />
                <div />
                <!-- Update -->
                <button
                    class="btn bg-blue-600"
                    on:click={() => {
                        mode = "update";
                    }}
                    on:keydown={null}>Update</button
                >
                <!-- delete -->
                <button
                    class="btn bg-red-600"
                    on:click={() => {
                        listClick(selecteduser, i);
                        mode = "delete";
                        openModal();
                    }}
                    on:keydown={null}>Delete</button
                >
            </div>
        </div>
    {/each}
    <!-- List ends -->
{:else}
    <div class="">
        <button
            class="btn btn bg-blue-600"
            on:click={() => {
                lineSelected = -1;
            }}
            on:keydown={null}
        >
        Retour liste
        </button>

        <Form {user} {mode} on:submitForm={validateForm} />
    </div>

    {#if error}
        <Modal visible={true} title="Attention">
            <p>{error}</p>
            <button autofocus class="btn bg-blue-600" on:click={closeModal}>Ok</button>
        </Modal>
    {/if}
{/if}
<Modal visible={modalOpen} title="Suppression d'un enregistrement">
    {#if deleteInProgress}
        {#await deleteInProgress then result}
            <p>Enregistrement supprimé.</p>
            <button autofocus class="btn bg-blue-600" on:click={closeModal}>ok</button>
        {:catch err}
            <p>Suppression impossible</p>
            <button class="btn bg-blue-600" on:click={closeModal}>ok</button>
        {/await}
    {:else}
        <p>Supprimer {user} ?</p>
        <div class="mt-5 flex justify-between">
            <button class="btn bg-red-600" on:click={deleteRecord(selected)}
                >Oui</button
            >
            <button autofocus class="btn bg-blue-600" on:click={closeModal}>Non</button>
        </div>
    {/if}
</Modal>
