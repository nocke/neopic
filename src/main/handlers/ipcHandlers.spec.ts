import { describe, it, expect, afterEach, vi, beforeAll } from 'vitest'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { numIpcFunctions, setupIPC } from './ipcHandlers'
import { beforeEach } from 'node:test'

type MockHandle = {
  (channel: string, listener: (event: IpcMainInvokeEvent, ...args: unknown[]) => Promise<unknown> | unknown): void;
  mock: {
    calls: unknown[];
    instances: unknown[];
  };
};

vi.mock('electron', () => ({
  ipcMain: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handle: vi.fn((channel: string, _listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any) => {
      console.log('Howdy Partner', channel)
    })
  },
  app: {
    getPath: vi.fn().mockReturnValue('/fake/user/data/path')
  }
}))

describe('IPC Handlers', () => {
  let handle: MockHandle

  // once before all(!)
  beforeAll(async () => {
    setupIPC()

    handle = ipcMain.handle as MockHandle
    expect(ipcMain.handle).toHaveBeenCalledTimes(numIpcFunctions)
    expect(handle.mock.calls.length).toBe(numIpcFunctions)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('ipcMain.handle should be called for setupIPC', () => {

    console.log(`ipcMain.handle was called ${handle.mock.calls.length} times`, ' 🤡 ', numIpcFunctions)
  })

})
