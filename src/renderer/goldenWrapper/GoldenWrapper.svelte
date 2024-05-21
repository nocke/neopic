<!-- src/renderer/goldenWrapper/GoldenWrapper.svelte -->
<style src="./GoldenWrapper.sass" lang="sass"></style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { VirtualLayout, LayoutConfig, ComponentContainer, ResolvedComponentItemConfig } from 'golden-layout'
  import Test from '../test/Test.svelte'

  let container: HTMLElement
  let goldenLayout: VirtualLayout

  const config: LayoutConfig = {
    root: {
      type: 'row',
      content: [
        {
          type: 'component',
          componentType: 'testComponent',
          componentState: { label: 'A' },
        },
      ],
    },
  }

  function handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) {
    const { componentState } = itemConfig
    new Test({
      target: container.element,
      props: componentState,
    })
    return {
      component: undefined,
      virtual: true,
    }
  }

  function handleUnbindComponentEvent(container: ComponentContainer) {
    // Optional: clean up if necessary
  }

  onMount(() => {
    goldenLayout = new VirtualLayout(container, handleBindComponentEvent, handleUnbindComponentEvent)
    goldenLayout.loadLayout(config)
  })

  onDestroy(() => {
    goldenLayout?.destroy()
  })
</script>

<svelte:window
  on:resize="{() => {
    console.log('██ on:resize')
    goldenLayout?.updateSize()
  }}"
/>
<div bind:this="{container}" class="golden-container"></div>
