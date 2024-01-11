<script>
  const name = 'Svelte'

  import { onMount } from 'svelte'

  import Header from './Header.svelte'

  onMount(async () => {
    console.log('svelte mounted')
  })
</script>

<main>
  <Header></Header>
  <h1>Hello {name}!</h1>
</main>

<style src="./App.sass" lang="sass"></style>
