<script>
  const name = 'Svelte'

  import { onMount } from 'svelte'

  import Header from './Header.svelte'

  onMount(async () => {
    console.log('svelte mounted')
  })

  async function listDir() {
    console.log('list Directory (renderer)')
    const files = await window.electron.ipcRenderer.invoke('list-home-dir')
    console.log(JSON.stringify(files, null))
  }
</script>

<main>
  <Header></Header>
  <h1>Hello {name} 123!</h1>

  <button on:click={listDir}>
    List home contents
  </button>
</main>

<style src="./App.sass" lang="sass"></style>
