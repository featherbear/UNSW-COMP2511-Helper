<script>
  export let data;

  import { Button, Field, Input } from "svelma";
  import MultilineDialog from "./MultilineDialog.js";

  function loadJSONLines(json_lines) {
    try {
      let lines = json_lines
        .trim()
        .replace(/\r/g, "")
        .split("\n");

      $data = lines.map(JSON.parse);
      // TODO: Finish this
    } catch (err) {
      console.log(err);
      // TODO: Do something with the error
    }
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
        loadJSONLines(r);
      }
    });
  }
</script>

<Button on:click={prompt}>Load</Button>

<!-- <Field label="Name">
  <Input value="Rich Harris" />
</Field>

<Field label="Email" type="is-danger" message="Email is invalid">
  <Input value="john@" />
</Field>

<Field label="Username" type="is-success" message="Username is available">
  <Input value="joey55" />
</Field> -->
