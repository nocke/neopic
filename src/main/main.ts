import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import fs from 'fs'
import os from 'os'
import { DirectoryError, FileList } from '../shared/sharedTypes';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  if ('code' in (e as any)) return true
  else return false
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // ████████████████████████████████████████████████████████████

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

  // ████████████████████████████████████████████████████████████

  mainWindow.webContents.openDevTools();
}; // createWindow

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

