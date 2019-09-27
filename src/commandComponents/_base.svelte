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
    <Button type="is-danger" outlined>
      <Icon icon="trash-alt" pack="far" />
    </Button>
  </td>
  <slot />
  <td>
    <Icon customClass="dragger" icon="grip-lines" pack="fas" />
  </td>
</tr>
