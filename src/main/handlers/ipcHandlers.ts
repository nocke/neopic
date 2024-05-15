import { ipcMain } from 'electron'

import fs from 'fs'
import os from 'os'
import { DirectoryError, FileList } from '../../shared/sharedTypes'

import packageJson from '../../../package.json'


function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  if ('code' in (e as any)) return true
  else return false
}

export const setupIPC = () => {

  ipcMain.handle('get-host-info', async (): Promise<object> => {
    return {
      version: packageJson.version,
      homeDir: os.homedir()
    }
  })

  ipcMain.handle('get-home-dir', async (): Promise<string> => {
    return os.homedir()
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
