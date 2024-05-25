<style src="./ExplorerBar.sass" lang="sass"></style>

<script lang="ts">
  import { JsonValue } from 'golden-layout'
  // eslint-disable-next-line svelte/valid-compile
  export let componentState: JsonValue | undefined

  // import { onMount } from 'svelte'
  import { hostInfos } from '../store/store'

  // onMount(async () => {
  // })
</script>

<section class="explorerBar">
  <table class="hostInfos">
    {#each Object.entries($hostInfos ?? {}) as [key, value]}
      <tr><th>{key}</th><td>{value}</td></tr>
    {/each}
  </table>
  <h1>Headline One<br />The quick bröwn fox jumps øvér…</h1>
  <h2>Headline Two<br />The quick bröwn fox jumps øvér…</h2>
  <h3>Headline Three<br />The quick bröwn fox jumps øvér…</h3>
  <h4>Headline Three<br />The quick bröwn fox jumps øvér…</h4>

  <input type="text" placeholder="placeholder" />
  <button type="submit">Load</button>
  <div class="button">mock button</div>
  <a class="button" href="#123">mock anchor button</a>

  <p>Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque humanitate provinciae longissime absunt.</p>
  Qua de causa Helvetii quoque reliquos Gallos virtute praecedunt, quod fere.
  <div>&lt;div&gt;cotidianis proeliis cum Germanis contendunt&lt;div&gt;</div>
</section>
