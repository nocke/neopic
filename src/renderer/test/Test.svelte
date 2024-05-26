<style src="./Test.sass" lang="sass"></style>

<script lang="ts">
  import { JsonValue } from 'golden-layout'
  import { onDestroy } from 'svelte'
  // eslint-disable-next-line svelte/valid-compile
  export let componentState: JsonValue | undefined

  export let message = 'ja, some default message'

  onDestroy(() => {
    console.log('███ Test is being destroyed')
    // Cleanup logic goes here
  })
</script>

<section>{message} Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test</section>
