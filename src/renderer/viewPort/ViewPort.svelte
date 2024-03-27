<script lang="ts">
  import CounterTwo from "../CounterTwo.svelte"

  let path: string = 'c:/depot'
  // null ≙ not yet loaded, empty ≙ no files in folder
  let files: string[] | null = null

  function updatePath(newPath: string) {
    path = newPath
    // automatically reload directory contents upon path change
    listDir()
  }

  async function listDir() {
    files = await window.electron.ipcRenderer.invoke<string[]>('list-home-dir')
  }
</script>

<section>

  <form class="form">
    <input type="text" bind:value={path} on:change="{() => updatePath(path)}" placeholder="Enter path" />
    <button on:click="{listDir}">Load</button>
    <div class="button">mock button</div>
    <a class="button" href="#123">mock anchor button</a>
  </form>

  <hr/>

  <CounterTwo></CounterTwo>

  <hr/>
  viewBox for {path}
  {#if files === null}
    <div>Directory not loaded. Please load the directory.</div>
  {:else if files.length === 0}
    <div>No files in directory.</div>
  {:else}
    <ul class="plain">
      {#each files as file}
        <li>{file}</li>
      {/each}
    </ul>
  {/if}

</section>

<style src="./ViewPort.sass" lang="sass"></style>
