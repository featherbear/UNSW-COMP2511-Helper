<script>
  export let value = "";
  export let placeholder;
  export let pack = "fas";
  export let icon;

  import { Icon } from "svelma";
</script>

<div class="control has-icons-left">
  <input {placeholder} type="text" class="input" bind:value on:keydown />
  <Icon {pack} {icon} isLeft="true" />
</div>
