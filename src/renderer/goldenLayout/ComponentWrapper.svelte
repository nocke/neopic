<!-- src/renderer/goldenLayout/ComponentWrapper.svelte -->
<style src="./ComponentWrapper.sass" lang="sass"></style>

<script lang="ts">
  import type { ComponentConfig } from './layout-types'
  import { SvelteComponent } from 'svelte'

  import TestComponent from '../test/Test.svelte'
  import ExplorerBar from '../explorerBar/ExplorerBar.svelte'
  import ViewPort from '../viewPort/ViewPort.svelte'

  let instance: SvelteComponent

  interface ComponentMap {
    [key: string]: typeof TestComponent | typeof ExplorerBar | typeof ViewPort | undefined
  }

  const componentMap: ComponentMap = {
    testComponent: TestComponent,
    explorerBar: ExplorerBar,
    viewPort: ViewPort,
  }

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

  function getComponent(typeName: string): typeof TestComponent | typeof ExplorerBar | typeof ViewPort | null {
    return componentMap[typeName] || null
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
  <svelte:component
   this="{getComponent(componentConfig.componentTypeName)}"
   bind:this="{instance}"
   componentState="{componentConfig.componentState}"/>
</section>
