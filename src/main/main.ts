// src\main\main.ts
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import dummyModule from '../dummyModule'
import { DirectoryError, FileList, Settings } from '../shared/sharedTypes'

import fs from 'fs'
import os from 'os'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

dummyModule.sayHi()
console.log(`the truth is ${dummyModule.truth}`)
console.log('os homedir: ', os.homedir())


function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  if ('code' in (e as any)) return true
  else return false
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'img/icons/icon_512×512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // =======================================================================
  // main functions

  // ipcMain.handle('get-settings', async (_event): Promise<Settings> => {
  //   return {
  //     theme: 'banana',
  //     language: 'en'
  //   }
  // })

  ipcMain.handle('get-home-dir', async (_event): Promise<string> => {
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
} // createWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
