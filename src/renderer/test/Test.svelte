<style src="./Test.sass" lang="sass"></style>

<script lang="ts">
  import { JsonValue } from 'golden-layout'
  // eslint-disable-next-line svelte/valid-compile
  export let componentState: JsonValue | undefined

  export let message = 'ja, some default message'
</script>

<section>{message} Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test</section>
