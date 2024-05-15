import { expect } from 'chai'
import sinon from 'sinon'
import * as os from 'os'
import { setupIPC } from './ipcHandlers'

describe('IPC Handlers', () => {
  let ipcMainMock: sinon.SinonStubbedInstance<any>
  let electron: any

  before(async () => {
    electron = await import('electron')
  })

  beforeEach(() => {
    ipcMainMock = sinon.stub(electron.ipcMain)
    sinon.replace(electron, 'ipcMain', ipcMainMock)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('get-home-dir', () => {
    it('should return a plausible home directory path', async () => {
      setupIPC() // Setup IPC with the mocked ipcMain

      const handler = ipcMainMock.handle.getCall(0).args[1] as () => Promise<string>
      const result = await handler()

      const homeDir = os.homedir()
      expect(result).to.equal(homeDir)
      expect(result).to.match(/^(\/home\/|C:\\Users\\|\/Users\/)/) // RegEx for Linux, Windows, or Mac paths
    })
  })
})
