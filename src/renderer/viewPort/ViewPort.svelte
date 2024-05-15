// src/renderer/viewPort/ViewPort.svelte
<style src="./ViewPort.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import CounterTwo from '../CounterTwo.svelte'
  import { path } from '../store/store'
  import { FileList } from '../../shared/sharedTypes'

  let pathTyping: string // path, as it's being typed
  let files: FileList = null

  onMount(async () => {
    console.log('ViewPort.svelte: onMount()', path)

    console.log('OS DIR***', await window.electron.ipcRenderer.invoke<string>('get-home-dir'))
    console.log('VERSION ***', await window.electron.ipcRenderer.invoke<object>('get-host-info'))

    pathTyping = $path
    listDir($path)
  })

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault() // no actual submit and reload
    const formData = new FormData(event.target as HTMLFormElement)
    const submittedPath = formData.get('pathInput')

    if (typeof submittedPath === 'string') {
      path.set(submittedPath)
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

<section>
  <form class="form" on:submit="{handleSubmit}">
    <input type="text" bind:value={pathTyping} name="pathInput" placeholder="Enter path" />
    <button type="submit">Load</button>
    <div class="button">mock button</div>
    <a class="button" href="#123">mock anchor button</a>
  </form>

  <CounterTwo></CounterTwo>

  <hr />
  viewBox for {path}
  {#if files === null}
    <div>Directory not loaded...</div>
  {:else if !Array.isArray(files)}
    <div>TODO types are shit, have separate </div>
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
