<script>
  const name = 'Svelte'

  import { onMount } from 'svelte'

  import Header from './Header.svelte'

  onMount(async () => {
    console.log('svelte mounted')
  })

  function listDir() {
    console.log('list Directory (renderer)')
    window.electron.ipcRenderer.invoke('list-home-dir').then(()=> console.log('no result yet (renderer)'))

    // files => {
    //   console.log(files)
    // })
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
