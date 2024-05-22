<!-- src/renderer/goldenLayout/ComponentWrapper.svelte -->
<style lang="sass">
@import '../common'

section
  text-align: center
  padding: .4em .2em
  font-size: 1.6em

  background: plum
  border: 8px dashed purple
  box-sizing: border-box
  width: 100%
</style>

<script lang="ts">
  export let message = 'component wrapper'
  export let width
  export let height
</script>

<section>
  {message}<br />
  width: {width}<br />
  height: {height}<br />
</section>
