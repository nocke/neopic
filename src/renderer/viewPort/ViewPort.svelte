<style src="./ViewPort.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import CounterTwo from '../CounterTwo.svelte'
  import { curDir } from '../store/store'
  import { FileList } from '../../shared/sharedTypes'

  let pathTyping: string // path, as it's being typed
  let files: FileList = null

  $: {
    if ($curDir) {
      listDir($curDir)
    }
  }

  onMount(async () => {
    console.log('ViewPort.svelte: onMount()', $curDir)
  })

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault() // no actual submit and reload
    const formData = new FormData(event.target as HTMLFormElement)
    const submittedPath = formData.get('pathInput')

    if (typeof submittedPath === 'string') {
      curDir.set(submittedPath)
      listDir(submittedPath)
    }
  }

  async function listDir(directoryPath: string) {
    console.log('List Dir * * *')
    try {
      files = await window.electron.ipcRenderer.invoke('list-dir', directoryPath)
    } catch (error) {
      console.error('error listing directory:', directoryPath, error)
    }
  }
</script>

// src/renderer/viewPort/ViewPort.svelte
<section>
  <form class="form" on:submit="{handleSubmit}">
    <input type="text" bind:value="{pathTyping}" name="pathInput" placeholder="Enter path" />
    <button type="submit">Load</button>
  </form>

  <CounterTwo></CounterTwo>

  <hr />
  <h2>viewBox for {$curDir}</h2>
  {#if files === null}
    <b>Directory not loaded...</b>
  {:else if !Array.isArray(files)}
    <div>Invalid files array...</div>
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
