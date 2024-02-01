import { INinjaAction } from 'ninja-keys/dist/interfaces/ininja-action'

// REF attributes: /github.com/ssleptsov/ninja-keys?tab=readme-ov-file#attributes
export const hotkeys: INinjaAction[] = [
  {
    id: 'Home',
    title: 'Open Home',
    hotkey: 'cmd+h,ctrl+h',
    mdIcon: 'home',
    handler: () => {
      console.log('navigation to home')
    },
  },
  {
    id: 'Open Projects',
    title: 'Open Projects',
    hotkey: 'cmd+o,ctrl+o',
    mdIcon: 'apps',
    handler: () => {
      console.log('navigation to projects')
    },
  },
]
