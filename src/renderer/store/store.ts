// src/renderer/store/store.ts
import { Writable, writable } from 'svelte/store'

export const invertMode: Writable<boolean> = writable<boolean>(false)

export const path: Writable<string> = writable<string>('c:/depot')
