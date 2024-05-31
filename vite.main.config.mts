/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { getBuildConfig, getBuildDefine, external, pluginHotRestart } from './vite.base.config'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'build'>
  const { forgeConfigSelf } = forgeEnv
  const define = getBuildDefine(forgeEnv)
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => '[name].js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [pluginHotRestart('restart')],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    test: {
      environment: 'node',
      globals: true,
      // setupFiles: './test/setup.ts', // Optional, if you have any setup file
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
