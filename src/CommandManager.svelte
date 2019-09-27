<script>
  export let data;
  import commandComponents from "./commandComponents";
</script>

<style>
  .flex {
  }
</style>

<table class="table is-fullwidth is-hoverable">
  <tbody>
    {#each $data.commands as command}
      <svelte:component
        this={commandComponents.resolve(command)}
        {...command} />
      <!-- <div>{JSON.stringify(command)}</div> -->
    {/each}
  </tbody>
</table>
