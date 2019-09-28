<script>
  export let data;
  import commandComponents from "./commandComponents";
  let { Base } = commandComponents;

  let tableRows;

  import Sortable from "@shopify/draggable/lib/sortable.js";

  import { onMount } from "svelte";

  onMount(() => {
    const sortable = new Sortable(tableRows, {
      draggable: "tr",
      handle: ".dragger",
      mirror: {
        constrainDimensions: true,
        xAxis: false
      }
    });
    sortable.on("sortable:sorted", function(e) {
      let { newIndex, oldIndex } = e.data;

      let val_new = $data.commandsOrder[newIndex];
      let val_old = $data.commandsOrder[oldIndex];

      $data.commandsOrder[oldIndex] = val_new;
      $data.commandsOrder[newIndex] = val_old;
    });
  });
</script>

<table class="table is-fullwidth is-hoverable">
  <tbody bind:this={tableRows}>
    {#each Object.keys($data.commands) as commandId}
      <Base
        on:delete={() => {
          $data.commandsOrder = $data.commandsOrder.filter(i => i != commandId);
          delete $data.commands[commandId];
        }}
        orderingId={commandId}>
        <svelte:component
          this={commandComponents.resolve($data.commands[commandId])}
          bind:data={$data.commands[commandId]} />
      </Base>
    {/each}
  </tbody>
</table>
