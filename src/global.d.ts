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

// make HMR extension known (for some comfort with HMR devtime tweaks)
// REF github.com/rixo/svelte-hmr?tab=readme-ov-file#whats-hmr-by-the-way

interface ImportMeta {
  hot?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accept(callback: (module: any) => void): void;
      dispose(callback: () => void): void;
  };
}
