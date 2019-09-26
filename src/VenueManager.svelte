<script>
  export let data;
  export let name;
  import { Button, Field } from "svelma";

  import MyInput from "./components/MyInput.svelte";
  import ListItem from "./components/ListItem.svelte";

  import { keyDownEventFactory, objKeys } from "./utils.js";

  let roomNameInput = "";
  let sizeSelectElement;
  let sizeInput = "";

  function addRoomEvent() {
    if (!roomNameInput) return;
    if (!sizeInput) return;

    // Assumption - a room can only have one size
    if ($data.venueData[name][sizeInput].indexOf(roomNameInput) == -1) {
      $data.venueData[name][sizeInput] = [
        ...$data.venueData[name][sizeInput],
        roomNameInput
      ];
    }

    sizeSelectElement.value = sizeInput = "";
    roomNameInput = "";
  }
</script>

<style>
  .elem {
    flex-basis: 49.5%;
    margin-top: 5px;
  }

  .roomList {
    margin-left: 0;
    margin-top: 0;
  }
</style>

<div class="card elem">
  <header class="card-header">
    <p class="card-header-title">{name}</p>
  </header>
  <div class="card-content">
    <div class="content">
      <ul class="roomList">
        {#each Object.entries(objKeys.unpack($data.venueData[name])) as [roomName, size]}
          <ListItem
            pack="fas"
            icon="times"
            label={`${roomName} - ${size}`}
            on:click={() => {
              $data.venueData[name][size] = $data.venueData[name][size].filter(e => e != roomName);
            }} />
        {/each}
      </ul>
      <Field grouped>
        <MyInput
          bind:value={roomNameInput}
          on:keydown={keyDownEventFactory(addRoomEvent)}
          placeholder="Room name"
          icon="door-open"
          pack="fas"
          class="flex-shrink" />

        <div class="control">
          <div class="select">
            <select bind:value={sizeInput} bind:this={sizeSelectElement}>
              <option disabled selected value />
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        <p class="control">
          <Button type="is-primary" on:click={addRoomEvent}>Add room</Button>
        </p>
      </Field>

    </div>
  </div>
</div>
