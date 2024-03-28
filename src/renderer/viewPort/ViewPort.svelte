// src/renderer/viewPort/ViewPort.svelte
<style src="./ViewPort.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import CounterTwo from '../CounterTwo.svelte'
  import { path } from './store/store';

  // null ≙ not yet loaded, empty ≙ no files in folder
  let files: string[] | null = null

  onMount(() => {
    console.log('ViewPort.svelte: onMount()', path)
    listDir($path)
  })

  // automatically reload directory contents upon path change
  function updatePath(newPath: string) {
    path.set(newPath)
    listDir(newPath)
  }

  async function listDir(directoryPath: string) {
    console.log('List Dir')
    files = await window.electron.ipcRenderer.invoke<string[]>('list-home-dir', directoryPath)
  }

  if (import.meta.hot) {
    // tree-shakable
    import.meta.hot.accept((_newModule) => {
      console.log('HMR update ViewPort')
    })
  }
</script>

<section>
  <form class="form">
    <input type="text" bind:value="{path}" on:change="{() => updatePath(path)}" placeholder="Enter path" />
    <button on:click="{listDir}">Load</button>
    <div class="button">mock button</div>
    <a class="button" href="#123">mock anchor button</a>
  </form>

  <CounterTwo></CounterTwo>

  <hr />
  viewBox for {path}
  {#if files === null}
    <div>Directory not loaded...</div>
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
