import App from './App.svelte'
import './_global.sass'
import { initializeSettings } from './store/settingsStore'

initializeSettings()

const target = document.body
if (target) {
  // eslint-disable-next-line no-new
  new App({
    target,
    props: {
      // Your props here
    }
  })
} else {
  console.error('No <main> element found to mount the Svelte app')
}
