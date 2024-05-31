// src/renderer/store/store.ts
import { HostInfos } from 'src/shared/sharedTypes'
import { Writable, writable } from 'svelte/store'

export const invertMode: Writable<boolean> = writable<boolean>(false)

export const curDir: Writable<string|undefined> = writable<string|undefined>(undefined)

export const hostInfos = writable<HostInfos>()
