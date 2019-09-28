<script>
  export let data;

  import Datepicker from "../components/Datepicker.svelte";
</script>

<td class="has-text-centered">
  <span class="tag is-warning">Change</span>
</td>

<td>
  <div class="tags has-addons">
    <span class="tag is-dark">ID</span>
    <span class="tag is-light">{data.id}</span>
  </div>
</td>
<td>
  <Datepicker tagLabel="Start" bind:date={data.start} />
</td>
<td>
  <Datepicker tagLabel="End" bind:date={data.end} />
</td>
<td>
  <div class="tags has-addons">
    <span class="tag is-dark">Small</span>
    <span class="tag is-light">{data.small}</span>
  </div>
</td>
<td>
  <div class="tags has-addons">
    <span class="tag is-dark">Medium</span>
    <span class="tag is-light">{data.medium}</span>
  </div>
</td>
<td>
  <div class="tags has-addons">
    <span class="tag is-dark">Large</span>
    <span class="tag is-light">{data.large}</span>
  </div>
</td>
