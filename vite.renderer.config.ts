import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [

	],
	build: {
		rollupOptions: {
		  input: 'src/renderer.ts',
		  output: {
			entryFileNames: `renderer.js`,
			chunkFileNames: `renderer.js`,
			assetFileNames: `assets/renderer.[ext]`
		  }
		},
		outDir: '.vite/renderer/main_window'
	  },


});
