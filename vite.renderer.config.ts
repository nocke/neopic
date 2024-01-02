import { defineConfig } from 'vite';
// import svelte from '@sveltejs/vite-plugin-svelte/src/index.js';

const build = process.env.npm_lifecycle_script?.includes('vite build') ? {
	rollupOptions: {
		input: 'src/renderer.ts',
		output: {
			entryFileNames: `renderer.js`,
			chunkFileNames: `renderer.js`,
			assetFileNames: `assets/renderer.[ext]`
		}
	},
	outDir: '.vite/renderer/main_window'
} : undefined;

export default defineConfig({
	build,
	plugins: [
		// svelte()
		// PROBLEM: This expression is not callable. 		Type 'typeof import("@sveltejs/vite-plugin-svelte")' has no call signatures.ts(2349)
	]
});
