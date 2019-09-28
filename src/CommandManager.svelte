<script>
  export let data;
  import commandComponents from "./commandComponents";
  let { Base } = commandComponents;

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
    swappable.on("swappable:swapped", function(e) {
      let cur = parseInt(
        e.data.dragEvent.data.source.getAttribute("orderingId")
      );
      let sw = parseInt(e.data.swappedElement.getAttribute("orderingId"));

      let idx_cur = $data.commandsOrder.indexOf(cur);
      let idx_sw = $data.commandsOrder.indexOf(sw);

      $data.commandsOrder[idx_cur] = sw;
      $data.commandsOrder[idx_sw] = cur;
    });
  });
</script>

<table class="table is-fullwidth is-hoverable">
  <tbody bind:this={tableRows}>
    {#each Object.keys($data.commands) as commandId}
      <Base
        on:delete={() => {
          $data.commandsOrder = $data.commandsOrder.filter(i => i != commandId);
        }}
        orderingId={commandId}>
        <svelte:component
          this={commandComponents.resolve($data.commands[commandId])}
          {...$data.commands[commandId]} />
      </Base>
    {/each}
  </tbody>
</table>
