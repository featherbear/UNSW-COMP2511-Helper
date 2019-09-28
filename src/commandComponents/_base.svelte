<script>
  import { Button, Icon } from "svelma";
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

<tr>
  <td>
    <Button class="hoverOpacity" type="is-danger" outlined>
      <Icon icon="trash-alt" pack="far" />
    </Button>
  </td>
  <slot />
  <td>
    <Icon customClass="dragger" icon="grip-lines" pack="fas" />
  </td>
</tr>
