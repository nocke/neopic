<style src="./App.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './Header.svelte'
  import { NinjaKeys } from 'ninja-keys'
  import { hotkeys } from './ninja-support'

  const name = 'Svelte'
  let files: string[] = []

  onMount(async () => {
    console.log('svelte mounted')

    const ninja: NinjaKeys | null = document.querySelector('ninja-keys')
    if (ninja) {
      console.log('### ninja-keys found')
      ninja.data = hotkeys
    } else {
      console.log('### ninja-keys NOT found')
    }

    setTimeout(() => {
      document.getElementById('listDirButton')?.click()
    }, 500)
  })

  async function listDir() {
    files = await window.electron.ipcRenderer.invoke<string[]>('list-home-dir')
  }
</script>

<main>
  <Header></Header>
  <h1>Hello {name} 123!</h1>

  <button id="listDirButton" on:click="{listDir}"> List home contents 123 </button>

  <b>Ctrl+P for command palette,  ctrl+h, ctrl+o for whatever</b>
  <ninja-keys placeholder="Type a command or name…" openHotkey="cmd+p,cmd+shift+p,ctrl+p,ctrl+shift+p"></ninja-keys>

  <div id="files">
    {#each files as file (file)}
      <div class="file">{file}</div>
    {/each}
  </div>
</main>
