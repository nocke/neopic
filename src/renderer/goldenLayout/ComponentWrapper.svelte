<!-- src/renderer/goldenLayout/ComponentWrapper.svelte -->
<style src="./ComponentWrapper.sass" lang="sass"></style>

<script lang="ts">
  import type { ComponentConfig } from './layout-types'

  import TestComponent from '../test/Test.svelte'
  import ExplorerBar from '../explorerBar/ExplorerBar.svelte'

  interface ComponentMap {
    [key: string]: typeof TestComponent | typeof ExplorerBar | undefined
  }

  const componentMap: ComponentMap = {
    testComponent: TestComponent,
    explorerBar: ExplorerBar,
  }

  export let componentConfig: ComponentConfig

  $: {
    componentConfig.bounds
    console.log('***Bounds changed:', componentConfig.bounds)
  }
  $: {
    componentConfig.visible
    // console.log('Visibility changed:', componentConfig.visible)
  }
  $: {
    componentConfig.zIndex
    // console.log('Z-index changed:', componentConfig.zIndex)
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

  function getComponent(typeName: string): typeof TestComponent | typeof ExplorerBar | null {
    return componentMap[typeName] || null
  }

  function oneLevelStringify(obj: unknown): string {
    return JSON.stringify(obj, function (k, v) {
      return k && v && typeof v !== 'number' ? (Array.isArray(v) ? '[object Array]' : '' + v) : v
    })
  }
</script>

<section class="component-wrapper" style="{positioning(componentConfig)}">
  <div class="debug">
    <b>Wrapper: {componentConfig.componentTypeName}</b><br/>
    {componentConfig.message}<br/>
    bounds: {JSON.stringify(componentConfig.bounds, null, 1)}<br/>

    message: {componentConfig.message}<br/>
    componentState: {componentConfig.componentState}<br/>
    componentState: {oneLevelStringify(componentConfig.componentState)}<br/>
  </div>
  <!-- deferred (if needed anyhow)  id="{componentConfig.id}" -->
  <svelte:component this="{getComponent(componentConfig.componentTypeName)}" componentState="{componentConfig.componentState}"/>
</section>
