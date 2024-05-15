import { InlineConfig as VitestInlineConfig } from 'vitest'

// extend vite[.whatever].config.ts with test property
declare module 'vite' {
  interface UserConfig {
    test?: VitestInlineConfig
  }
}
