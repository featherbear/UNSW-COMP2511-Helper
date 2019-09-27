<script>
  export let data;
  import commandComponents from "./commandComponents";

  let tableRows;
  import dragula from "dragula";
  import "dragula/dist/dragula.min.css";

  import { onMount } from "svelte";
  onMount(() => {
    dragula({
      containers: [tableRows],
      moves: function(el, container, handle) {
        return handle.classList.contains("dragger");
      }
    });
  });
</script>

<table class="table is-fullwidth is-hoverable">
  <tbody bind:this={tableRows}>
    {#each $data.commands as command}
      <svelte:component
        this={commandComponents.resolve(command)}
        {...command} />
      <!-- <div>{JSON.stringify(command)}</div> -->
    {/each}
  </tbody>
</table>
