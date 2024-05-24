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
  import type { ComponentConfig } from './layout-types'

  export let componentConfig: ComponentConfig

  $: {
    componentConfig.bounds
    console.log('***Bounds changed:', componentConfig.bounds)
  }
  $: {
    componentConfig.visible
    console.log('Visibility changed:', componentConfig.visible)
  }
  $: {
    componentConfig.zIndex
    console.log('Z-index changed:', componentConfig.zIndex)
  }

  function positioning(componentConfig: ComponentConfig): string {
    // 'left', 'top', not needed for now
    let style = ['width', 'height'].map((key) => `${key}: ${componentConfig.bounds[key]}px;`).join(' ')
    if (!componentConfig.visible) {
      style += `display: none;`
    }
    if (componentConfig.zIndex !== '') {
      style += `z-index: ${componentConfig.zIndex};`
    }
    return style
  }
</script>

<section style="{positioning(componentConfig)}">
  <h2>Howdy</h2>
  {componentConfig.message}<br />
  {componentConfig.truth}<br />
  bounds: {JSON.stringify(componentConfig.bounds)}<br />

  <!-- {componentConfig.message}<br /> -->
  <!-- width: {width}<br />
  height: {height}<br /> -->
</section>
