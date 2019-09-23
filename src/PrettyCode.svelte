<script>
  export let data;

  let copyButtonText = "Copy";
  import { Button } from "svelma";

  function copyTextToClipboard(text, successFn, errorFn) {
    // Adapted from https://stackoverflow.com/a/30810322
    if (typeof successFn === "undefined") successFn = () => {};
    if (typeof errorFn === "undefined") errorFn = () => {};

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(successFn, errorFn);
    } else {
      var textArea = document.createElement("textarea");
      textArea.value = text;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      let status;
      let error_msg;

      try {
        status = document.execCommand("copy");
      } catch (err) {
        status = false;
        error_msg = err;
      }

      document.body.removeChild(textArea);

      (status ? successFn : errorFn)(error_msg);
    }
  }

  function copyEvt() {
    // TODO: Update copy function to copy elements as several JSON objects separated by new lines
    copyTextToClipboard(JSON.stringify($data), () => {
      let oldText = copyButtonText;
      copyButtonText = "Copied!";
      setTimeout(() => (copyButtonText = oldText), 2000);
    });
  }
</script>

<style>
  section {
    padding: 1.25rem 1.5rem;
  }

  pre {
    user-select: all;
    -webkit-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    padding: 0;
  }

  .copyBtnContainer {
    margin: 1em 0;
  }
</style>

<section class="section">
  <h1 class="is-size-2">Preview</h1>

  <div class="copyBtnContainer">
    <Button on:click={copyEvt}>{copyButtonText}</Button>
  </div>
  <pre class="prettyCode">{JSON.stringify($data, null, 2)}</pre>
</section>
