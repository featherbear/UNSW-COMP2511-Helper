<script>
  export let target;

  const minRatio = 0.05;
  const maxRatio = 0.6;

  /* START Drag events */
  let isDragging = false;
  function initDrag(e) {
    isDragging = true;
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    if (isDragging) {
      let width = windowWidth - e.clientX;
      target.style.width = `${wrapNumber(minWidth, width, maxWidth)}px`;
    }
  }

  function stopDrag(e) {
    isDragging = false;
  }
  /* END Drag events */

  /* START Utility */
  function wrapNumber(min, num, max) {
    return Math.min(Math.max(min, num), max);
  }
  /* END Utility */

  let windowWidth, minWidth, maxWidth;
  let lastWindowWidth;

  function updateSizes() {
    if (windowWidth) lastWindowWidth = windowWidth;
    windowWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );

    minWidth = minRatio * windowWidth;
    maxWidth = maxRatio * windowWidth;

    if (windowWidth <= 768) {
      // reset width for mobile responsive 100% width
      target.style.width = "";
    } else if (target && lastWindowWidth) {
      let ratio = wrapNumber(
        minRatio,
        window.getComputedStyle(target).width / lastWindowWidth,
        maxRatio
      );
      target.style.width = `${ratio * windowWidth}px`;
    }
  }

  import { onMount } from "svelte";
  onMount(updateSizes);
</script>

<style>
  .l-resizer {
    width: 2px;
    cursor: col-resize;
  }
  .l-resizer:not(:hover) {
    transition: background-color 0.8s;
  }
  .l-resizer:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .l-resizer:not(:hover):before {
    transition: border-color 0.8s;
  }
  .l-resizer:hover:before {
    border-color: rgb(130, 130, 130);
  }
  .l-resizer:before {
    position: absolute;
    content: "";
    top: 40%;
    width: 10px;
    border-top: 8px double rgb(190, 190, 190);
    transform: translateX(-50%);
  }
</style>

<svelte:window on:resize={updateSizes} />
<div
  class="l-resizer is-hidden-mobile"
  on:mousedown={initDrag}
  on:mousemove={doDrag}
  on:mouseup={stopDrag} />
