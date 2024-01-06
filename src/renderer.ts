import App from './App.svelte'
import './sass/global.sass'

console.log('👋 This message is being logged by "renderer.ts", included via Vite')

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
