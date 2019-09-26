<script>
  import { writable } from "svelte/store";

  const data = writable({ venueData: {}, commands: [] });

  import { Icon } from "svelma";

  import LResizer from "./components/L-Resizer.svelte";

  import PrettyCode from "./PrettyCode.svelte";
  import Form from "./Form.svelte";

  let codePanel;
</script>

<style>
  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    -webkit-user-select: none;
    user-select: none;
  }

  .columns {
    flex: 1;
  }

  .code-panel {
    padding: 0;
    background-color: #f5f5f5;
  }

  .footer {
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .footer .links,
  .footer .links a {
    display: flex;
    align-items: center;
  }
  .footer .links a:not(:first-child) {
    border-left: 2px solid #a7a7a7;
  }
  .footer .links a {
    padding: 5px;
    color: #a7a7a7;
    text-decoration: none;
  }
  .footer .links a:not(:hover) {
    transition: color 1s;
  }
  .footer .links a:hover {
    color: white;
  }

  .l-flex {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="wrapper">
  <div class="columns is-marginless">
    <div class="column has-background-white">
      <div class="section">
        <Form {data} />
      </div>
    </div>
    <div class="code-panel column is-one-fifth l-flex" bind:this={codePanel}>
      <LResizer target={codePanel} />
      <PrettyCode {data} />
    </div>
  </div>

  <footer class="footer has-background-dark has-text-light">
    <span>UNSW COMP2511 | 19T3 Assignment One | Venue Hire System Helper</span>
    <div class="links">
      <a href="/">
        <Icon pack="fab" size="is-medium" icon="github" />
        GitHub
      </a>
      <a href="https://featherbear.github.io/UNSW-COMP2511/">
        <Icon pack="far" size="is-medium" icon="edit" />
        Blog
      </a>
    </div>
  </footer>
</div>
