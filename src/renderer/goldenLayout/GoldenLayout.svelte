<!-- src/renderer/goldenLayout/GoldenLayout.svelte -->
<style src="./GoldenLayout.sass" lang="sass"></style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { VirtualLayout, LayoutConfig, ComponentContainer, ResolvedComponentItemConfig, LogicalZIndex } from 'golden-layout'
  import ComponentWrapper from './ComponentWrapper.svelte'
  import type { ComponentConfig } from './layout-types.d.ts'

  let width: number, height: number

  function onResize() {
    console.log('█onResize')
    // virtualLayout?.setSize(virtualLayout.container.offsetWidth, virtualLayout.container.offsetHeight);
  }

  $: {
    // trigger resize on width/heigh change (<main>-bound)
    width
    height
    onResize()
  }

  let componentsMap = new Map<ComponentContainer, ComponentConfig>()

  let rootContainer: HTMLElement
  let virtualLayout: VirtualLayout

  const layoutConfig: LayoutConfig = {
    root: {
      type: 'row',
      content: [
        {
          type: 'component',
          componentType: 'testComponent',
          componentState: { message: 'A' },
          width: 40, // just to be now equal
        },
        {
          type: 'component',
          componentType: 'explorerBar',
          componentState: { message: 'B' },
        },
      ],
    },
  }

  onMount(() => {
    virtualLayout = new VirtualLayout(rootContainer, handleBindComponentEvent, handleUnbindComponentEvent)

    virtualLayout.loadLayout(layoutConfig)
    window.addEventListener('resize', updateLayoutSize)
    updateLayoutSize() // Initial size update
  })

  // called for every component listed in the LayoutConfig
  function handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) {
    console.log('████handleBindComponentEvent')
    console.log(' █ container:', container)
    console.log(' █ itemcConfig:', itemConfig)

    const componentConfig: ComponentConfig = {
      message: 'banana', //
      key: container,
      id: itemConfig.id,
      componentTypeName: ResolvedComponentItemConfig.resolveComponentTypeName(itemConfig) ?? '',
      componentState: itemConfig.componentState,
      bounds: {
        left: 17,
        top: 18,
        width: 19,
        height: 20,
      },
      visible: true,
      zIndex: '1',
    }

    const component = new ComponentWrapper({
      target: container.element,
      props: { componentConfig },
    })

    componentsMap.set(container, componentConfig)
    // svelte plug does some silly (refresh-triggering?) componentsMap=componentsMap here

    // get's called on every 'outer resize'
    container.virtualRectingRequiredEvent = (container: ComponentContainer, width: number, height: number) => {
      console.log('virtualRecting', container.title, width, height)

      let componentConfig = componentsMap.get(container)
      if (!componentConfig) {
        console.error('could not find componentConfig for container ', container)
        return
      }

      componentConfig.bounds = {
        left: 7,
        top: 8,
        width,
        height,
      }

      // this writes directly to component (the one bound to *this* handler)
      // AND triggers update (thanks to $set)
      // AND updates in map (thanks to the call-by-reference nature of js)
      component.$set({ componentConfig })
    }
    container.virtualVisibilityChangeRequiredEvent = (container: ComponentContainer, visible: boolean) => {
      console.log('virtualVisibilty', container.title, visible)
    }
    container.virtualZIndexChangeRequiredEvent = (container: ComponentContainer, logicalZIndex: LogicalZIndex, defaultZIndex: string) => {
      console.log('virtualZIndex', container.title, `logical: ${logicalZIndex}  `, `defaultZIndex: ${defaultZIndex}  `)
    }

    container.on('resize', () => {
      console.log('██ █ █ resize')
    })

    return {
      component,
      virtual: true,
    }
  }

  function handleUnbindComponentEvent(container: ComponentContainer) {
    const component = componentsMap.get(container)
    if (component) {
      // TODO  must get from component.destroy()
      console.log('typeof component', typeof component)
      componentsMap.delete(container)
    }
  }

  function updateLayoutSize() {
    if (rootContainer) {
      const width = rootContainer.offsetWidth
      const height = window.innerHeight / 2 // matches the height:50% in sass
      virtualLayout?.setSize(width, height)
    }
  }

  onDestroy(() => {
    window.removeEventListener('resize', updateLayoutSize)
    virtualLayout?.destroy()
  })
</script>

<svelte:window on:resize="{onResize}"/>
<main bind:this="{rootContainer}" class="golden-container"></main>
