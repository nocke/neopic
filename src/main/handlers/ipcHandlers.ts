// src/main/handlers/ipcHandlers.ts
import { app, ipcMain, IpcMainInvokeEvent } from 'electron'

import fs from 'fs'
import os from 'os'
import path from 'path'
import { AppState, defaultAppState, DirectoryError, FileList, HostInfos } from '../../shared/sharedTypes'

import packageJson from '../../../package.json'

const STATE_PATH = path.join(app.getPath('userData'), 'appState.json')

const workspaceDir = path.resolve(__dirname, '../../')

function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  return typeof e === 'object' && e !== null && 'code' in e
}

const ipcFunctions = {
  getHostInfos : async (): Promise<HostInfos> => {
    return {
      version: packageJson.version,
      homeDir: os.homedir(),
      stateDir: STATE_PATH,
      workspaceDir
    }
  },

  readState: async (): Promise<AppState> => {
    try {
      const data = await fs.promises.readFile(STATE_PATH, 'utf8')
      return JSON.parse(data) as AppState
    } catch (error) {
      console.error('Failed to read state:', error)
      return defaultAppState
    }
  },

  writeState:  async (_event: IpcMainInvokeEvent, state: AppState): Promise<void> => {
    try {
      await fs.promises.writeFile(STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
    } catch (error) {
      console.error('Failed to write state:', error)
      throw new Error('Failed to write state')
    }
  },

  listDir : async (_event: IpcMainInvokeEvent, dirPath: string): Promise<FileList> => {
    console.log('render: list-dir 7', dirPath)

    try {
      await fs.promises.access(dirPath, fs.constants.F_OK)
      await fs.promises.access(dirPath, fs.constants.R_OK)
      const files = fs.promises.readdir(dirPath)
      return files
    } catch (err: unknown) {
      if (err && isErrnoException(err) && err.code === 'ENOENT') {
        return 'ENOENT' as DirectoryError
      } else if (err && isErrnoException(err) && err.code === 'EACCESS') {
        return 'EACCESS' as DirectoryError
      } else {
        throw err
      }
    }
  }
}

// used for testing
export const numIpcFunctions = Object.keys(ipcFunctions).length

export const setupIPC = () => {
  ipcMain.handle('get-host-infos', ipcFunctions.getHostInfos)
  ipcMain.handle('read-state', ipcFunctions.readState)
  ipcMain.handle('write-state',ipcFunctions.writeState)
  ipcMain.handle('list-dir',ipcFunctions.listDir)
}
