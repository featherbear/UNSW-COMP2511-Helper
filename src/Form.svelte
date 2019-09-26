<script>
  export let data;

  import { Snackbar, Button, Field } from "svelma";
  import MultilineDialog from "./MultilineDialog.js";

  import ObjectData from "./Venues/ObjectData.js";
  import VenueManager from "./Venues/VenueManager.svelte";
  import MyInput from "./MyInput.svelte";

  function loadJSONLines(json_lines) {
    let lines = json_lines
      .trim()
      .replace(/\r/g, "")
      .split("\n");

    lines = lines.map(JSON.parse);

    let venueData = {};
    let commands = [];

    for (let command of lines) {
      if (ObjectData.getType(command) == "room") {
        if (!(command.venue in venueData)) {
          venueData[command.venue] = {
            small: [],
            medium: [],
            large: []
          };
        }
        venueData[command.venue][command.size].push(command.room);
      } else {
        commands.push(command);
      }
    }

    $data = {
      venueData,
      commands
    };
  }

  function prompt() {
    MultilineDialog.prompt({
      title: "Enter JSON",
      placeholder: `e.g. { "command": "room", "venue": "Zoo", "room": "Penguin", "size": "small" }
{ "command": "room", "venue": "Zoo", "room": "Hippo", "size": "large" }
{ "command": "room", "venue": "Zoo", "room": "Elephant", "size": "large" }
{ "command": "room", "venue": "Gardens", "room": "Figtree", "size": "large" }
{ "command": "request", "id": "Annual Meeting", "start": "2019-03-25", "end": "2019-03-26", "small": 1, "medium": 0, "large": 1 }
{ "command": "request", "id": "Mattress Convention", "start": "2019-03-24", "end": "2019-03-27", "small": 0, "medium": 0, "large": 1 }
{ "command": "request", "id": "Dance Party", "start": "2019-03-26", "end": "2019-03-26", "small": 0, "medium": 0, "large": 1 }
{ "command": "change", "id": "Annual Meeting", "start": "2019-03-27", "end": "2019-03-29", "small": 1, "medium": 0, "large": 0 }
{ "command": "request", "id": "CSE Autumn Ball", "start": "2019-03-25", "end": "2019-03-26" , "small": 1, "medium": 0, "large": 0 }
{ "command": "cancel", "id": "Dance Party" }
{ "command": "request", "id": "Vivid", "start": "2019-03-26", "end": "2019-03-26", "small": 1, "medium": 0, "large": 0 }
{ "command": "list", "venue": "Zoo" }`
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

  let venueNameInput = "";
  function inputKeyDownEvent(e) {
    e.keyCode && e.keyCode === 13 && addVenueEvent();
  }
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
    on:keydown={inputKeyDownEvent}
    placeholder="Venue name"
    icon="building"
    pack="far" />
  <p class="control">
    <Button type="is-primary" on:click={addVenueEvent}>Add venue</Button>
  </p>
</Field>
