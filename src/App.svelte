<script>
  import { writable } from "svelte/store";

  const data = writable({});

  import PrettyCode from "./PrettyCode.svelte";
  import Form from "./Form.svelte";
</script>

<style>
  .code-panel {
    padding: 0;
    background-color: #f5f5f5;
  }

  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .columns {
    flex: 1;
  }
</style>

<div class="wrapper">
  <div class="columns is-marginless">
    <div class="column has-background-primary">
      <div class="section">
        <Form {data} />
      </div>
    </div>
    <div class="code-panel column is-one-fifth is-primary">
      <PrettyCode {data} />
    </div>
  </div>

  <footer class="footer">Foota</footer>
</div>
