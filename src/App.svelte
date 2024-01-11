<script>
  const name = 'Svelte'

  import { onMount } from 'svelte'

  import Header from './components/Header.svelte'

  onMount(async () => {
    console.log('svelte mounted')
  })
</script>

<main>
  <Header></Header>
  <h1>Hello {name}!</h1>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    border: 8px dashed purple;
  }
</style>
