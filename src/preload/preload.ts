import { contextBridge, ipcRenderer } from 'electron'
// import os from 'os'

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const message = `preload ${100 + 23}`

console.log(message)

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage: (channel: string, data: unknown) => ipcRenderer.send(channel, data),
    invoke: (channel: string, data: unknown) => ipcRenderer.invoke(channel, data),
  },
})
