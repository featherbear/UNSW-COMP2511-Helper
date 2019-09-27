<script>
  export let command;
  export let id;
  export let start;
  export let end;
  export let small;
  export let medium;
  export let large;

  import Base from "./_base.svelte";
</script>

<Base>
  <td>Change</td>
  <td>ID: {id}</td>
  <td>Start {start}</td>
  <td>End {end}</td>
  <td>Small {small}</td>
  <td>Medium {medium}</td>
  <td>Large {large}</td>
</Base>
