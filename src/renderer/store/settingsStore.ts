// src/stores/settingsStore.ts
import { Writable, writable } from 'svelte/store'
import { Settings } from 'src/shared/sharedTypes'

// Initial default values
const defaultSettings: Settings = {
  theme: 'light',
  language: 'en',
}

export const settings: Writable<Settings> = writable<Settings>(defaultSettings)

export const initializeSettings = (): void => {
  console.log('initialize settings***')
}

// const createSettingsStore = () => {
//   const { subscribe, set } = writable<Settings>(defaultSettings)

//   return {
//     subscribe,
//     initialize: async () => {
//       const settings = await ipcRenderer.invoke('get-settings')
//       set(settings)
//     },
//     // Additional methods to update settings if needed
//   }
// }

// export const settingsStore:Settings = {
//   theme: 'kiwi',
//   language: 'fr'
// }
// // createSettingsStore()
