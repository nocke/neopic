import { describe, it, expect, afterEach, vi, beforeAll } from 'vitest'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { numIpcFunctions, setupIPC } from './ipcHandlers'

type MockHandle = {
  (channel: string, listener: (event: IpcMainInvokeEvent, ...args: unknown[]) => Promise<unknown> | unknown): void;
  mock: {
    calls: unknown[];
    instances: unknown[];
  };
};

const dummyEvent = {} as IpcMainInvokeEvent

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type listenerType = (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any;
const ipcFunctions: Record<string, listenerType> = {}

vi.mock('electron', () => ({
  ipcMain: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handle: vi.fn((channel: string, listener: listenerType) => {
      ipcFunctions[channel] = listener
    })
  },
  app: {
    getPath: vi.fn().mockReturnValue('/fake/ünicødetést😬/path')
  }
}))

describe('IPC Handlers', () => {
  let handle: MockHandle

  // once before all(!)
  beforeAll(async () => {
    setupIPC()
    handle = ipcMain.handle as MockHandle
    expect(ipcMain.handle).toHaveBeenCalledTimes(numIpcFunctions)

  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('num of registered ipcHandlers matches', () => {
    expect(handle.mock.calls.length).toBe(numIpcFunctions)
  })

  it('getHostInfo returns expected properties with correct formats', async () => {
    console.log(ipcFunctions)
    const hostInfos = await ipcFunctions.getHostInfos(dummyEvent)
    console.log(hostInfos)

    // version: '0.18.0',
    // homeDir: 'C:\\Users\\e523070',
    // stateDir: '\\fake\\user\\data\\path\\appState.json',
    // workspaceDir: 'C:\\depot\\www\\neopic\\src'

    expect(hostInfos.version).toMatch(/^\d+\.\d+\.\d+$/)
    expect(hostInfos.homeDir).toMatch(/^([A-Z]:\\|\/)?[\w\s\\\/]+$/i)
    expect(hostInfos.stateDir.replace(/\\/g, '/')).toBe('/fake/ünicødetést😬/path/appState.json')
    expect(hostInfos.workspaceDir).toMatch(/^([A-Z]:\\|\/)?[\w\s\\\/]+$/i)
  })

})
