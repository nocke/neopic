import { defineConfig } from 'vite'

// build params only for 'vite sanity testing' with `npm run vite:build-main`
// for actual dev (npm start) and publishing this is a hindrance

// process.env.npm_lifecycle_script?.includes('vite build') ? {...} : undefind

const build = {
  target: 'node20',
  ssr: true, // prevents,
  rollupOptions: {
    input: 'src/main/main.ts',
    output: {
      entryFileNames: 'main.js',
      chunkFileNames: 'main.js',
      assetFileNames: 'assets/main.[ext]'
    }
  },
  outDir: '.vite/build'
}


export default defineConfig({
  build,
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext']
  }
  // optimizeDeps: {
  //   // specify the libraries to be optimized for Node.js
  //   include: ['axios'],
  // }

})
