// src/global.d.ts

interface Window {
  electron: {
    ipcRenderer: {
      sendMessage: (channel: string, data?: unknown) => void;
      invoke: <T = unknown>(channel: string, data?: unknown) => Promise<T>;
      // ... any other methods you've exposed
    };
  };
}
