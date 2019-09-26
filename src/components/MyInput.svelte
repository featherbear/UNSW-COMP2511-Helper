<script>
  export let value = "";
  export let placeholder;
  export let pack = "fas";
  export let icon;

  let class_extra = "";
  export { class_extra as class };

  import { Icon } from "svelma";
</script>

<div class="control has-icons-left {class_extra}">
  <input {placeholder} type="text" class="input" bind:value on:keydown />
  <Icon {pack} {icon} isLeft="true" />
</div>
