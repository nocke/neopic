<!-- src/renderer/goldenLayout/ComponentWrapper.svelte -->
<style src="./ComponentWrapper.sass" lang="sass"></style>

<script lang="ts">
  import type { ComponentConfig } from './layout-types'
  import { SvelteComponent } from 'svelte'
  import { getComponent } from './ComponentRegistry'

  let instance: SvelteComponent

  export let componentConfig: ComponentConfig

  $: {
    componentConfig.bounds
  }
  $: {
    componentConfig.visible
  }
  $: {
    componentConfig.zIndex
  }

  function getStyles(componentConfig: ComponentConfig): string {
    let style = ['width', 'height'].map((key) => `${key}: ${componentConfig.bounds[key]}px;`).join(' ')
    if (!componentConfig.visible) {
      style += `display: none;`
    }
    if (componentConfig.zIndex !== '') {
      style += `z-index: ${componentConfig.zIndex};`
    }
    console.log('█ █ █ getStyles()', style)
    return style
  }

  function oneLevelStringify(obj: unknown): string {
    return JSON.stringify(obj, function (k, v) {
      return k && v && typeof v !== 'number' ? (Array.isArray(v) ? '[object Array]' : '' + v) : v
    })
  }
</script>

<section class="component-wrapper" style="{getStyles(componentConfig)}">
  <div class="debug">
    <b>Wrapper: {componentConfig.componentTypeName}</b><br/>
    {componentConfig.message}<br/>
    bounds: {JSON.stringify(componentConfig.bounds, null, 1)}<br/>

    message: {componentConfig.message}<br/>
    componentState: {componentConfig.componentState}<br/>
    componentState: {oneLevelStringify(componentConfig.componentState)}<br/>
  </div>
  <!-- deferred (if needed anyhow)  id="{componentConfig.id}" -->

  <!--                                                              NEXT ↓ -->
  <svelte:component this="{getComponent(componentConfig.componentTypeName)}" bind:this="{instance}" componentState="{componentConfig.componentState}"/>
</section>
