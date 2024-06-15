// src/renderer/goldenLayout/layout-types.d.ts
import { JsonValue } from 'golden-layout'

type Bounds = {
  left: number
  top: number
  width: number
  height: number
  [key: string]: number
}
type ComponentConfig = {
  message: string //TEMPTEMP
  key: ComponentContainer
  id: string
  componentTypeName: string
  componentState?: JsonValue
  bounds: Bounds
  visible: boolean
  zIndex: string
}
