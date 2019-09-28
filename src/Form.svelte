<script>
  export let data;

  import MultilineDialog from "./components/MultilineDialog.js";
  import MyInput from "./components/MyInput.svelte";

  import { Snackbar, Button, Field } from "svelma";
  import ObjectData from "./ObjectData.js";
  import { keyDownEventFactory } from "./utils.js";

  import VenueManager from "./VenueManager.svelte";
  import CommandManager from "./CommandManager.svelte";

  // Store parsed JSON lines into $data store
  function loadJSONLines(json_lines) {
    $data = ObjectData.parseJSONlines(json_lines);
  }

  // Popup prompt
  function prompt() {
    MultilineDialog.prompt({
      title: "Enter JSON",
      placeholder: `e.g. ${ObjectData.exampleJSONlines}`
    }).then(r => {
      if (r) {
        try {
          loadJSONLines(r);
          Snackbar.create({
            message: "JSON loaded!",
            type: "is-success"
          });
        } catch (e) {
          Snackbar.create({
            message: `Error: ${e}`,
            type: "is-danger",
            duration: 5000
          });
        }
      }
    });
  }

  // Create a new venue
  let venueNameInput = "";
  function addVenueEvent() {
    if (!venueNameInput) return;
    if (!(venueNameInput in $data.venueData)) {
      $data.venueData[venueNameInput] = {
        small: [],
        medium: [],
        large: []
      };
    }
    venueNameInput = "";
  }
</script>

<style>
  .thirdFlow {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: 10px auto;
  }
</style>

<Button on:click={prompt}>Import JSON strings</Button>

<div class="thirdFlow">
  {#each Object.keys($data.venueData) as venueName}
    <VenueManager name={venueName} {data} />
  {/each}
</div>

<Field grouped>
  <MyInput
    bind:value={venueNameInput}
    on:keydown={keyDownEventFactory(addVenueEvent)}
    placeholder="Venue name"
    icon="building"
    pack="far" />
  <p class="control">
    <Button type="is-primary" on:click={addVenueEvent}>Add venue</Button>
  </p>
</Field>

<CommandManager {data} />
<Field grouped>
  <!-- Command type -->
  <!-- Depending on command -->
  <p class="control">
    <Button type="is-primary" on:click={addVenueEvent}>Add command</Button>
  </p>
</Field>
