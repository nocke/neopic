// eslint-disable-next-line import/no-unresolved
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vite.main.config.mts",
  // COULDDO, once they have a test section
  // "./vite.preload.config.mts",
  // "./vite.renderer.config.mts"
])
