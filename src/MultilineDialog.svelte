<script>
  // Heavily FOSS'd from https://github.com/c0bra/svelma

  import { createEventDispatcher } from "svelte";

  export let title = "";
  export let placeholder = "";

  let input;
  let prompt = "";
  let resolve;

  const dispatch = createEventDispatcher();
  export let promise = new Promise(fulfil => (resolve = fulfil));

  function close() {
    dispatch("destroy");
  }

  function confirm() {
    resolve(prompt);
    close();
  }

  function cancel() {
    resolve(null);
    close();
  }
</script>

<style>
  .is-titleless {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .modal-card-foot {
    justify-content: end;
  }
</style>

<svelte:options accessors />
<div class="modal is-active">
  <div class="modal-background" on:click={close} />
  <div class="modal-card">
    {#if title}
      <header class="modal-card-head">
        <p class="modal-card-header">{title}</p>
      </header>
    {/if}
    <section class="modal-card-body" class:is-titleless={!title}>
      <textarea
        bind:value={prompt}
        class="textarea"
        bind:this={input}
        {placeholder} />
    </section>
    <footer class="modal-card-foot">
      <button class="button" on:click={cancel}>Cancel</button>
      <button class="button is-success" on:click={confirm}>OK</button>
    </footer>
  </div>
</div>
