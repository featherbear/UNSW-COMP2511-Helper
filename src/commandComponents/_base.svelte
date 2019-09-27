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
</style>

<tr>
  <td>
    <Button type="is-danger" outlined>
      <Icon icon="trash-alt" pack="far" />
    </Button>
  </td>
  <slot />
  <td>//TODO: _RESIZER_</td>
</tr>
