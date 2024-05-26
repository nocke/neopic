<!-- src/renderer/viewPort/ViewPort.svelte -->
<style src="./ViewPort.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import CounterTwo from '../CounterTwo.svelte'
  import { curDir, hostInfos } from '../store/store'
  import { FileList } from '../../shared/sharedTypes'

  let pathTyping: string // path, as it's being typed
  let files: FileList = null

  $: {
    if ($curDir) {
      pathTyping = $curDir // since curDir changes might have different sources
      listDir($curDir)
    }
  }

  $: { // initialize curDir, if not yet
    if ($hostInfos && !$curDir) {
      $curDir = $hostInfos.homeDir

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
    }
  }

  async function listDir(directoryPath: string) {
    console.log('List Dir * * *')
    try {
      files = await window.electron.ipcRenderer.invoke('listDir', directoryPath)
    } catch (error) {
      console.error('error listing directory:', directoryPath, error)
    }
  }
</script>

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
    <ul class="plain file-list">
      {#each files as file}
        <li>{file}</li>
      {/each}
    </ul>
  {/if}
</section>
