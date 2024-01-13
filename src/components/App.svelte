<script lang="ts">
  import { onMount } from 'svelte'
       import Header from './Header.svelte'

  const name = 'Svelte'
  let files = []

  onMount(async () => {
    console.log('svelte mounted')
    setTimeout(() => {
      document.getElementById('listDirButton')?.click()
    }, 500)
  })

  async function listDir() {
    let joe = 12345
    joe = 'bert'

    console.log('list Directory (renderer)', joe)
    files = await window.electron.ipcRenderer.invoke('list-home-dir')
  }
</script>

<main>
  <Header></Header>
  <h1>Hello {name} 123!</h1>

  <button id="listDirButton" on:click={listDir}>
    List home contents 123
  </button>

  <div id="files">
    {#each files as file (file)}
      <div class="file">{file}</div>
    {/each}
  </div>
</main>

<style src="./App.sass" lang="sass"></style>
