// global.d.ts

export {}

declare global {
  interface Window {
    ipcRenderer: {
      on(channel: string, listener: (...args: unknown[]) => void): void;
      off(channel: string, listener: (...args: unknown[]) => void): void;
      send(channel: string, ...args: unknown[]): void;
      invoke(channel: string, ...args: unknown[]): unknown;
    };
  }
}
