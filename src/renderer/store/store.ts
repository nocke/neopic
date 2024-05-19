// src/renderer/store/store.ts
import { Writable, writable } from 'svelte/store'

export const invertMode: Writable<boolean> = writable<boolean>(false)

export const curDir: Writable<string|undefined> = writable<string|undefined>(undefined)
