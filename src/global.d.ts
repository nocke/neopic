// src/global.d.ts

interface Window {
  electron: {
    ipcRenderer: {
      sendMessage: (channel: string, data?: unknown) => void;
      invoke: (channel: string, data?: unknown) => Promise<any>;
      // ... any other methods you've exposed
    };
  };
}
