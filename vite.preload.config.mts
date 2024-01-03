import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [

	],
	build: {
		rollupOptions: {
			input: 'src/preload.ts',
			output: {
				entryFileNames: `preload.js`,
				chunkFileNames: `preload.js`,
				assetFileNames: `assets/preload.[ext]`
			}
		  },
		outDir: '.vite/build',
	},

});
