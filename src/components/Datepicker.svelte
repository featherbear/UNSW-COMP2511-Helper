<script>
  export let tagLabel;
  export let date;

  let elem;

  import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.js";
  import "bulma-calendar/dist/css/bulma-calendar.min.css";

  import { onMount } from "svelte";
  onMount(() => {
    bulmaCalendar.attach(elem, {
      type: "date",
      dateFormat: "YYYY-MM-DD",
      showHeader: false,
      showFooter: false,
      displayMode: "dialog"
    });
  });
</script>

<style>
  :global(.datetimepicker-clear-button) {
    display: none !important;
  }
</style>

<input type="date" bind:this={elem} bind:value={date} />
