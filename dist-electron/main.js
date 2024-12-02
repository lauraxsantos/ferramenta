import { app as n, BrowserWindow as t, ipcMain as l } from "electron";
import { fileURLToPath as p } from "node:url";
import o from "node:path";
const i = o.dirname(p(import.meta.url));
process.env.APP_ROOT = o.join(i, "..");
const s = process.env.VITE_DEV_SERVER_URL, _ = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function r() {
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(i, "preload.mjs"),
      nodeIntegration: !1,
      // Segurança: Desabilitar nodeIntegration
      contextIsolation: !0
      // Habilitar contextIsolation
    }
  }), s ? e.loadURL(s) : e.loadFile(o.join(n.getAppPath(), "dist/index.html")), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.webContents.openDevTools();
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("ready", () => {
  t.getAllWindows().length === 0 && (r(), l.on("request-message", (a) => {
    a.reply("main-process-message", "Hello from main process");
  }));
});
n.whenReady().then(r);
export {
  _ as MAIN_DIST,
  c as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
