// src\main\main.ts
import { app, BrowserWindow, screen } from 'electron'
import path from 'path'

import { setupIPC } from './handlers/ipcHandlers'

// handle creating/removing shortcuts on Windows when installing/uninstalling.
// must stay a dependency, not a devDependency
if (require('electron-squirrel-startup')) {
  app.quit()
}

app.on('ready', () => {
  setupIPC()

  const args = process.argv.slice(1)
  if (args.includes('-selftest')) {
    console.log("NEOPIC-SELFTEST")
    setTimeout(() => {
      app.exit(0) // 0 := all good
      console.log('Done\nNow')
    }, 3000)
    // COULDDO skip creating the window by calling 'return'
  }

  const allDisplays = screen.getAllDisplays()
  const rightmostDisplay = allDisplays.reduce((prev, curr) => {
    return (curr.bounds.x > prev.bounds.x) ? curr : prev;
  });

  // align left half of rightmost display
  const mainWindow = new BrowserWindow({
    x: rightmostDisplay.bounds.x,
    y: rightmostDisplay.bounds.y,
    width: rightmostDisplay.size.width / 2,
    height: rightmostDisplay.size.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  mainWindow.webContents.openDevTools()
}) // onReady


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    onReady()
  }
})

