<script>
  /*
    // I get an undefined `fe` variable (`fe.c`) using the dist version
     import { Button, Icon } from "svelma";
  */

  import Button from "svelma/src/components/Button.svelte";
  import Icon from "svelma/src/components/Icon.svelte";
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  export let orderingId;
</script>

<style>
  :global(td) {
    vertical-align: middle !important;
  }
  td:first-child {
    padding-left: 0;
    padding-right: 0;
  }

  :global(.hoverOpacity) {
    opacity: 0.2;
  }

  :global(.hoverOpacity):not(:hover) {
    transition: opacity 0.8s;
  }

  :global(.hoverOpacity):hover {
    opacity: 1;
  }

  :global(.dragger) {
    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  :global(.dragger:active) {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
</style>

<tr {orderingId}>
  <td>
    <Button
      class="hoverOpacity"
      type="is-danger"
      outlined
      on:click={() => dispatch('delete')}>
      <Icon icon="trash-alt" pack="far" />
    </Button>
  </td>
  <slot />
  <td>
    <Icon customClass="dragger" icon="grip-lines" pack="fas" />
  </td>
</tr>
