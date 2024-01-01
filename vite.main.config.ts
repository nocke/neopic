import { defineConfig } from 'vite';

export default defineConfig({

  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: `main.js`,
        chunkFileNames: `main.js`,
        assetFileNames: `assets/main.[ext]`
      }
    },
    outDir: '.vite/build'
  },

  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
});
