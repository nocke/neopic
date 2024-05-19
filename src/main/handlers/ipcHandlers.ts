import { app, ipcMain } from 'electron'

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

export const setupIPC = () => {

  ipcMain.handle('get-host-infos', async (): Promise<HostInfos> => {
    return {
      version: packageJson.version,
      homeDir: os.homedir(),
      stateDir: STATE_PATH,
      workspaceDir
    }
  })

  ipcMain.handle('get-home-dir', async (): Promise<string> => {
    return os.homedir()
  })

  ipcMain.handle('read-state', async (): Promise<AppState> => {
    try {
      const data = await fs.promises.readFile(STATE_PATH, 'utf8')
      return JSON.parse(data) as AppState
    } catch (error) {
      console.error('Failed to read state:', error)
      return defaultAppState
    }
  })

  ipcMain.handle('write-state', async (_event, state: AppState): Promise<void> => {
    try {
      await fs.promises.writeFile(STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
    } catch (error) {
      console.error('Failed to write state:', error)
      throw new Error('Failed to write state')
    }
  })


  ipcMain.handle('list-dir', async (_event, dirPath: string): Promise<FileList> => {
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
  })

  // ipcMain.handle('get-settings', async (_event): Promise<Settings> => {
  //   return {
  //     theme: 'banana',
  //     language: 'en'
  //   }
  // })

}
