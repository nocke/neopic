import { defineConfig } from 'vite';

// build params only for 'vite sanity testing' with `npm run vite:build-main`
// for actual dev (npm start) and publishing this is a hindrance

const build = process.env.npm_lifecycle_script?.includes('vite build') ? {
  rollupOptions: {
    input: 'src/main.ts',
    output: {
      entryFileNames: `main.js`,
      chunkFileNames: `main.js`,
      assetFileNames: `assets/main.[ext]`
    }
  },
  outDir: '.vite/build'
} : undefined;

export default defineConfig({
  build,
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
});
