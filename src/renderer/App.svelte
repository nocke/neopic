<style src="./App.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './header/Header.svelte'
  import { NinjaKeys } from 'ninja-keys'
  import { hotkeys } from './ninja-support'
  import ExplorerBar from './explorerBar/ExplorerBar.svelte'
  import ViewBox from './viewBox/ViewBox.svelte'
  import { invertMode } from './store/store'



  const html = document.documentElement


  onMount(async () => {
    console.log('svelte mounted')

    const ninja: NinjaKeys | null = document.querySelector('ninja-keys')
    if (ninja) {
      ninja.data = hotkeys
    } else {
      console.warn('ninja-keys NOT found')
    }

    invertMode.subscribe(i => {
      html.classList.toggle('invert', i)
    })

    // NOTE just for development
    setTimeout(() => {
      document.getElementById('listDirButton')?.click()
    }, 500)
  })


</script>

<main>
  <Header>Ctrl+P for command palette,  ctrl+h, ctrl+o for whatever</Header>

  <ninja-keys placeholder="Type a command or name…" openHotkey="cmd+p,cmd+shift+p,ctrl+p,ctrl+shift+p"></ninja-keys>

  <div class='split-hori'>
  <ExplorerBar></ExplorerBar>
  <ViewBox></ViewBox>
  </div>
  <!-- <h1>Hello {name} 123!</h1>

  <button id="listDirButton" on:click="{listDir}"> List home contents 123 </button>


  <div id="files">
    {#each files as file (file)}
      <div class="file">{file}</div>
    {/each}
  </div> -->
</main>
