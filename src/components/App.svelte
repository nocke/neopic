<script lang="ts">
  import { onMount } from 'svelte'
       import Header from './Header.svelte'

  const name = 'Svelte'

  onMount(async () => {
      console.log('svelte mounted')
    setTimeout(() => {
      document.getElementById('listDirButton')?.click()
    }, 1000)
  })

  async function listDir() {
      const joe: any = '12345'
    // let joeNumber: number=<number><unknown>joe
    // // test failure joeNumber = 'abc'

    console.log('list Directory (renderer)', joe)
    const files=await window.electron.ipcRenderer.invoke  ('list-home-dir');
    console.log( files.join('\n')   );
  }
</script>

<main>
  <Header></Header>
  <h1>Hello {name} 123!</h1>

  <button id="listDirButton" on:click={listDir}>
    List home contents
  </button>
</main>

<style src="./App.sass" lang="sass"></style>
