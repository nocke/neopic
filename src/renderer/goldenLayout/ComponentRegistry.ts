import TestComponent from '../test/Test.svelte'
import ExplorerBar from '../explorerBar/ExplorerBar.svelte'
import ViewPort from '../viewPort/ViewPort.svelte'

export interface ComponentMap {
  [key: string]: typeof TestComponent | typeof ExplorerBar | typeof ViewPort | undefined
}

const permittedComponents: ComponentMap = {
  testComponent: TestComponent,
  explorerBar: ExplorerBar,
  viewPort: ViewPort,
}

export function getComponent(typeName: string): typeof TestComponent | typeof ExplorerBar | typeof ViewPort | null {
  return permittedComponents[typeName] || null
}

export default {
  getComponent
}
