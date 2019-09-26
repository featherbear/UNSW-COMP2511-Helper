<script>
  export let data;
  export let name;
  import { Button, Field } from "svelma";
  import MyInput from "../MyInput.svelte";
  import ListItem from "./ListItem.svelte";

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

  // let rooms;
  // $: {
  //   let tempRooms = [];
  //   for (let roomSize of Object.keys($data.venueData[name])) {
  //     tempRooms.push(
  //       ...$data.venueData[name][roomSize].map(n => `${n} - ${roomSize}`)
  //     );
  //   }
  //   rooms = tempRooms;
  // }

  const tools = {
    pack(obj) {
      // Convert {key: value} into {value: [key, ...]}
      let res = {};
      for (let [key, val] of Object.entries(obj)) {
        if (!(val in res)) res[val] = [];
        res[val].push(key);
      }
      return res;
    },
    unpack(obj) {
      // Convert {value: [key, ...]} into {key: value}
      let res = {};
      for (let [val, keys] of Object.entries(obj)) {
        for (let key of keys) {
          res[key] = val;
        }
      }
      return res;
    }
  };
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
        {#each Object.entries(tools.unpack($data.venueData[name])) as [roomName, size]}
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
          on:keydown={inputKeyDownEvent}
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
  <!-- <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer> -->
</div>
