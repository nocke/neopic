import App from './App.svelte';
import './index.sass';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
console.log('howdy, renderer 345789');


const target = document.body;
if (target) {
  const app = new App({
    target,
    props: {
      // Your props here
    }
  });
} else {
  console.error('No <main> element found to mount the Svelte app');
}

