<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import Modal from "../../../components/modal/Modal.svelte";
    import ButtonList from "../../../components/buttons/ButtonList.svelte";
    import Form from "./form.svelte";

    let prefix = "";
    let card = "";
    let i = 0;
    let isSelected = false;
    let lineSelected = -1;
    let error = "";
    let mode = "show";
    let modalOpen = false;
    let deleteInProgress;
    let recordsCards = [];

    async function refreshList() {
        const res = await fetch(`/api/cards/`);
        recordsCards = await res.json();
        lineSelected = -1;
        mode = "show";
    }

    const openModal = () => {
        modalOpen = true;
    };

    const closeModal = () => {
        modalOpen = false;
        error = null;
        deleteInProgress = false;
    };

    onMount(async () => {
        await refreshList();
        clear();
    });

    $: filteredcards = prefix
        ? recordsCards.filter((selectedCard) => {
              const name = `${selectedCard.card_text}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
        : recordsCards;

    $: selected = filteredcards[i];
    $: reset_inputs(selected);

    async function validateForm() {
        if (card) {
            if (mode === "update") {
                await update();
            } else {
                await create();
            }
        }
    }

    async function create() {
        i = recordsCards.length - 1;
        const res = await fetch("../api/cards/", {
            method: "POST",
            body: JSON.stringify({
                card,
            }),
        });
        const json = await res.json();
        await refreshList();
        clear();
        lineSelected = -1;
    }

    async function update() {
        selected.card = card;
        const Id = selected.compteur;
        const res = await fetch("../api/cards/", {
            method: "PUT",
            body: JSON.stringify({
                Id,
                card,
            }),
        });
        const json = await res.json();
        await refreshList();
        clear();
        lineSelected = -1;
    }

    async function deleteRecord(theFilteredcard) {
        mode = "delete";
        selected = theFilteredcard;
        deleteInProgress = await fetch(`/api/cards/${selected.compteur}`, {
            method: "DELETE",
        });
        i = Math.min(i, filteredcards.length - 2);
        await refreshList();
    }

    function clear() {
        card = "";
        isSelected = false;
        lineSelected = -1;
    }

    function modeAdd() {
        mode = "add";
        clear();
        lineSelected = 0;
    }

    function reset_inputs(selectedCard) {
        card = selectedCard ? selectedCard.card_text : "";
        isSelected = true;
    }

    function listClick(theFilteredcard, lineNumber) {
        error = "";
        selected = theFilteredcard;
        lineSelected = lineNumber;
    }
</script>

{#if lineSelected === -1 || mode === "delete"}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
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
        <input placeholder="Recherche des cartes" bind:value={prefix} />
        <div>
            {filteredcards.length} cartes
        </div>
    </div>
    <!-- List begins -->
    {#each filteredcards as selectedCard, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- Show line -->
        <div
            class="listItem hover:bg-primary hover:transition ease-out duration-500"
            on:click={() => {
                listClick(selectedCard, i);
            }}
            on:keydown={null}
        >
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="mh-10">
                {selectedCard.compteur} - {selectedCard.card_text}
            </div>
            <!-- Commands -->
            <div class="flex flex-row justify-between">
                <div />
                <div />
                <div />
                <!-- Update -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="col-start-11 col-end-10 flex justify-end cursor-pointer"
                    on:click={() => {
                        mode = "update";
                        listClick(selectedCard, i);
                    }}
                    on:keydown={null}
                >
                    <svg
                        class="w-5"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </div>
                <!-- delete -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="col-start-12 flex justify-end cursor-pointe"
                    on:click={() => {
                        listClick(selectedCard, i);
                        mode = "delete";
                        openModal();
                    }}
                    on:keydown={null}
                >
                    <svg
                        class="w-5"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </div>
            </div>
        </div>
    {/each}
    <!-- List ends -->
{:else}
    <div class="">
        <ButtonList on:click={refreshList} />

        <div class="flex h-screen justify-center items-center">
            <Form {card} {mode} on:submitForm={validateForm} />
        </div>
    </div>
    {#if error}
        <Modal visible={true} title="Attention">
            <p>{error}</p>
            <button autofocus class="btn bg-blue-600" on:click={closeModal}
                >Ok</button
            >
        </Modal>
    {/if}
    <div class="flex justify-between mt-10">
        {#if card && !isSelected}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={create}
                disabled={!card || isSelected}>Add</button
            >
        {/if}
        {#if card && selected && isSelected && mode !== "show"}
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={update}
                disabled={!card || !selected || !isSelected}>Update</button
            >
        {/if}
    </div>
{/if}

<Modal visible={modalOpen} title="Suppression d'un enregistrement">
    {#if deleteInProgress}
        {#await deleteInProgress then result}
            <p>Enregistrement supprimé.</p>
            <!-- svelte-ignore a11y-autofocus -->
            <button
                autofocus
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                on:click={closeModal}>ok</button
            >
        {:catch err}
            <p>Suppression impossible</p>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                on:click={closeModal}>ok</button
            >
        {/await}
    {:else}
        <p>Supprimer cette carte ?</p>
        <div class="mt-5 flex justify-between">
            <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                on:click={deleteRecord(selected)}>Oui</button
            >
            <!-- svelte-ignore a11y-autofocus -->
            <button
                autofocus
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                on:click={closeModal}>Non</button
            >
        </div>
    {/if}
</Modal>

<style>
    input {
        display: block;
        margin: 0 0 0.5em 0;
        padding: 0.5em;
    }

    label {
        font-size: 1.5em;
    }
</style>
