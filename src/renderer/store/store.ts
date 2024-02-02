import { Writable, writable } from 'svelte/store'

export const invertMode: Writable<boolean> = writable<boolean>(false)
