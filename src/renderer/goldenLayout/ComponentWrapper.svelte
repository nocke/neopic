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

  function getComponent(typeName: string): typeof TestComponent | typeof ExplorerBar | null {
    return componentMap[typeName] || null
  }

  function oneLevelStringify(obj: unknown): string {
    return JSON.stringify(obj, function (k, v) {
      return k && v && typeof v !== 'number' ? (Array.isArray(v) ? '[object Array]' : '' + v) : v
    })
  }
</script>

<section style="{positioning(componentConfig)}">
  <b>Wrapper</b><br/>
  {componentConfig.message}<br/>
  bounds: {JSON.stringify(componentConfig.bounds)}<br/>

  message: {componentConfig.message}<br/>
  componentTypeName: {componentConfig.componentTypeName}<br/>
  componentState: {componentConfig.componentState}<br/>
  componentState: {oneLevelStringify(componentConfig.componentState)}<br/>

  <!-- <slot id="{componentConfig.id}" componentType="{componentConfig.componentTypeName}" componentState="{componentConfig.componentState}" /> -->

  <!-- deferred (if needed anyhow)  id="{componentConfig.id}" -->
  <svelte:component this="{getComponent(componentConfig.componentTypeName)}" componentState="{componentConfig.componentState}"/>
</section>
