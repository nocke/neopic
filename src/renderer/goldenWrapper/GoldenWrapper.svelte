<!-- src/renderer/goldenWrapper/GoldenWrapper.svelte -->
<style src="./GoldenWrapper.sass" lang="sass"></style>

<script lang="ts">
  import { onMount, onDestroy, SvelteComponent } from 'svelte'
  import { VirtualLayout, LayoutConfig, ComponentContainer, ResolvedComponentItemConfig } from 'golden-layout'
  import Test from '../test/Test.svelte'
  import ComponentWrapper from './ComponentWrapper.svelte'

  let container: HTMLElement
  let virtualLayout: VirtualLayout

  const config: LayoutConfig = {
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

  const svelteComponents = new Map<ComponentContainer, SvelteComponent>()

  function handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) {

    console.log('████handleBindComponentEvent', container, ' █ ', itemConfig)

    const { componentState } = itemConfig
    const component = new ComponentWrapper({
      target: container.element,
      props: componentState,
    })
    svelteComponents.set(container, component)
    return {
      component,
      virtual: true,
    }
  }

  function handleUnbindComponentEvent(container: ComponentContainer) {
    const component = svelteComponents.get(container)
    if (component) {
      component.$destroy()
      svelteComponents.delete(container)
    }
  }

  function updateLayoutSize() {
    if (container) {
      const width = container.offsetWidth
      const height =  window.innerHeight / 2 // matches the height:50% in sass
      virtualLayout?.setSize(width, height)
    }
  }

  onMount(() => {
    virtualLayout = new VirtualLayout(container, handleBindComponentEvent, handleUnbindComponentEvent)
    virtualLayout.loadLayout(config)
    window.addEventListener('resize', updateLayoutSize)
    updateLayoutSize() // Initial size update
  })

  onDestroy(() => {
    window.removeEventListener('resize', updateLayoutSize)
    virtualLayout?.destroy()
  })
</script>

<div bind:this="{container}" class="golden-container"></div>
