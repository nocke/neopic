<style src="./ExplorerBar.sass" lang="sass"></style>

<script lang="ts">
  import { onMount } from 'svelte'
  let version: string

  onMount(async () => {
    const hostInfo = await window.electron.ipcRenderer.invoke<{ version: string }>('get-host-info')
    version = hostInfo.version
  })
</script>

<section>
  <h1>Headline One<br />The quick bröwn fox jumps øvér…</h1>
  <h2>Headline Two<br />The quick bröwn fox jumps øvér…</h2>
  <h3>Headline Three<br />The quick bröwn fox jumps øvér…</h3>
  <h4>Headline Three<br />The quick bröwn fox jumps øvér…</h4>

  <p>Version: {version}</p>

  <p>Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque humanitate provinciae longissime absunt.</p>
  Qua de causa Helvetii quoque reliquos Gallos virtute praecedunt, quod fere.
  <div>&lt;div&gt;cotidianis proeliis cum Germanis contendunt&lt;div&gt;</div>
</section>
