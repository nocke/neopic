import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { setupIPC } from './ipcHandlers'

vi.mock('electron', () => {
  return {
    ipcMain: {
      handle: vi.fn(),
    },
  }
})

describe('IPC Handlers', () => {
  let ipcMain: any

  beforeAll(async () => {


    const electron = await import('electron')
    ipcMain = electron.ipcMain
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('get-home-dir', () => {
    it('should return a plausible home directory path', async () => {
      setupIPC() // Setup IPC with the mocked ipcMain

      const handler = ipcMain.handle.mock.calls[0][1] as () => Promise<string>
      const result = await handler()
      console.log('result', result)

      expect(result).toMatch(/^(\/home\/|C:\\Users\\|\/Users\/)/) // RegEx for Linux, Windows, or Mac paths
    })
  })
})
