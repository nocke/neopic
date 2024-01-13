import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [

  ],
  build: {
    target: 'node20',
    ssr: true, // prevents 'externalized for browser' complaints
    rollupOptions: {
      input: 'src/preload/preload.ts',
      output: {
        entryFileNames: 'preload.js',
        chunkFileNames: 'preload.js',
        assetFileNames: 'assets/preload.[ext]'
      }
    },
    outDir: '.vite/build'
  }

})
