<!-- src/renderer/goldenLayout/GoldenLayout.svelte -->
<style src="./GoldenLayout.sass" lang="sass"></style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { VirtualLayout, LayoutConfig, ComponentContainer, ResolvedComponentItemConfig } from 'golden-layout'
  import ComponentWrapper from './ComponentWrapper.svelte'

  type Bounds = {
    left: number
    top: number
    width: number
    height: number
  }
  type ComponentConfig = {
    message: string //TEMPTEMP
    // key: ComponentContainer
    // id: string
    // componentType: string
    // componentState?: JsonValue
    bounds: Bounds
    // visible: boolean
    // zIndex: string
  }

  // ↓ let components: ComponentConfig[] = [];
  const components = new Map<ComponentContainer,ComponentConfig>()
  // ↑ const svelteComponents = new Map<ComponentContainer, SvelteComponent>()

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
        },
        {
          type: 'component',
          componentType: 'testComponent',
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
    console.log('████handleBindComponentEvent', ' █ container:', container, ' █ ', itemConfig)

    const { componentState } = itemConfig
    const component = new ComponentWrapper({
      target: container.element,
      props: componentState,
    })
    components.set(container, component)
    return {
      component,
      virtual: true,
    }
  }

  function handleUnbindComponentEvent(container: ComponentContainer) {
    const component = components.get(container)
    if (component) {
      // TODO  must get from component.destroy()
      console.log('typeof component', typeof component)
      components.delete(container)
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

<div bind:this="{rootContainer}" class="golden-container"></div>
