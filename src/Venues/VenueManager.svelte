<script>
  export let data;
  export let name;
  import { Button, Field } from "svelma";
  import MyInput from "../MyInput.svelte";

  let roomNameInput = "";
  let sizeSelectElement;
  let sizeInput = "";

  function inputKeyDownEvent(e) {
    e.keyCode && e.keyCode === 13 && addRoomEvent();
  }

  function addRoomEvent() {
    if (!roomNameInput) return;
    if (!sizeInput) return;
    // Check if room does not exist in the size?
    // TODO:  (any?)
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
    flex-basis: 48%;
    margin: 10px auto;
  }
</style>

<div class="card elem">
  <header class="card-header">
    <p class="card-header-title">{name}</p>
  </header>
  <div class="card-content">
    <div class="content">
      {JSON.stringify($data.venueData[name])}
      <Field grouped>
        <MyInput
          bind:value={roomNameInput}
          on:keydown={inputKeyDownEvent}
          placeholder="Room name"
          icon="door-open"
          pack="fas" />

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
  <!-- <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer> -->
</div>
