<script>
  import { Icon } from "svelma";

  export let label;
  export let pack = "fab";
  export let icon;
</script>

<style>
  li {
    display: flex;
  }

  li .icon {
    color: rgb(255, 149, 149);
  }

  li:not(:hover) .icon {
    display: none;
  }

  :global(.isPointer) {
    cursor: pointer;
  }
</style>

<li>
  {label}
  {#if icon}
    <span class="icon">
      <Icon {pack} {icon} customClass="isPointer" on:click />
    </span>
  {/if}
</li>
