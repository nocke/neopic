<!-- src/renderer/goldenLayout/GoldenLayout.svelte -->
<style src="./GoldenLayout.sass" lang="sass"></style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { VirtualLayout, LayoutConfig, ComponentContainer, ResolvedComponentItemConfig, LogicalZIndex } from 'golden-layout'
  import ComponentWrapper from './ComponentWrapper.svelte'
  import type { ComponentConfig } from './layout-types.d.ts'

  let rootElement: HTMLElement
  let virtualLayout: VirtualLayout
  let componentsMap = new Map<ComponentContainer, ComponentConfig>()

  let checkWidth: number, checkHeight: number

  const layoutConfig: LayoutConfig = {
    root: {
      type: 'row',
      content: [
        {
          type: 'component',
          componentType: 'testComponent',
          componentState: { message: 'A' },
          width: 40, // just to be not have equal width
        },
        {
          type: 'component',
          componentType: 'explorerBar',
          componentState: { message: 'B' },
        },
        {
          type: 'component',
          componentType: 'viewPort',
          componentState: { message: 'C' },
        },
      ],
    },
  }

  onMount(() => {
    virtualLayout = new VirtualLayout(rootElement, handleBindComponentEvent, handleUnbindComponentEvent)

    virtualLayout.loadLayout(layoutConfig)
    window.addEventListener('resize', updateLayoutSize)
    updateLayoutSize() // Initial size update
  })

  // called for every component listed in the LayoutConfig
  function handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) {
    const componentConfig: ComponentConfig = {
      message: 'banana', //
      key: container,
      id: itemConfig.id,
      componentTypeName: ResolvedComponentItemConfig.resolveComponentTypeName(itemConfig) ?? '',
      componentState: itemConfig.componentState,
      bounds: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
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
      let componentConfig = componentsMap.get(container)
      if (!componentConfig) {
        console.error('could not find componentConfig for container ', container)
        return
      }

      const containerBoundingClientRect = container.element.getBoundingClientRect()

      componentConfig.bounds = {
        left: containerBoundingClientRect.left,
        top: containerBoundingClientRect.top, /* coulddo: math.ceil() ?*/
        width,
        height,
      }

      // this writes directly to component (the one bound to *this* handler)
      // AND triggers update (thanks to $set)
      // AND updates in map (thanks to the call-by-reference nature of js)
      component.$set({ componentConfig })
    }
    container.virtualVisibilityChangeRequiredEvent = (_container: ComponentContainer, _visible: boolean) => {
      // NEXT
      console.log('████ virtualVisibilty', _container.title, _visible)
    }
    container.virtualZIndexChangeRequiredEvent = (_container: ComponentContainer, _logicalZIndex: LogicalZIndex, _defaultZIndex: string) => {
      // NEXT
      console.log('████ virtualZIndex', container.title, `logical: ${_logicalZIndex}  `, `defaultZIndex: ${_defaultZIndex}  `)
    }

    return {
      component,
      virtual: true,
    }
  }

  function handleUnbindComponentEvent(container: ComponentContainer) {
    const componentConfig = componentsMap.get(container)

    if (!componentConfig) {
      console.error('could not find componentConfig for container ', container)
      return
    }
    // NEXT  must get from component.destroy()
    console.log('unbinding... typeof component', typeof componentConfig)
    // something like this? container.component.destroy()
    componentsMap.delete(container)
  }

  function updateLayoutSize() {
    if (!rootElement) {
      console.error('UNDEFINED root element')
      return
    }
    const width = rootElement.offsetWidth
    const height = rootElement.offsetHeight
    virtualLayout?.setSize(width, height)
  }

  onDestroy(() => {
    window.removeEventListener('resize', updateLayoutSize)
    virtualLayout?.destroy()
  })
</script>

<main bind:this="{rootElement}" class="golden-container" bind:offsetWidth={checkWidth} bind:offsetHeight={checkHeight}>
    <div class='debug'>
      {checkWidth}&thinsp;×&thinsp;{checkHeight}
    </div>
</main>
