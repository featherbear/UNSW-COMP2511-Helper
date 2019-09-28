<script>
  export let data;
  import commandComponents from "./commandComponents";

  let tableRows;

  import Swappable from "@shopify/draggable/lib/swappable.js";

  import { onMount } from "svelte";
  onMount(() => {
    const swappable = new Swappable(tableRows, {
      draggable: "tr",
      handle: ".dragger",
      mirror: {
        constrainDimensions: true,
        xAxis: false
      }
    });
    swappable.on("swappable:swapped", function() {
      // TODO: SWAP
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
