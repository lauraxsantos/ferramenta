import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Acessando o diretório atual
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configurações de ambiente
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  // Criação da janela do Electron
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,  // Segurança: Desabilitar nodeIntegration
      contextIsolation: true,  // Habilitar contextIsolation
    },
  })


  // Se estiver em modo de desenvolvimento (usando Vite), carregar o conteúdo da URL do servidor de desenvolvimento
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // Caso contrário, carregue o arquivo local 'index.html' dentro do diretório win-unpacked/dist
    // win.loadFile(path.join(__dirname, 'dist', 'index.html'))
    // win.loadFile(path.join(__dirname, '../dist/index.html'));
    win.loadFile(path.join(app.getAppPath(), 'dist/index.html'));
    // win.loadFile('dist', 'index.html'))
  }
  // Enviar uma mensagem do processo principal para o processo de renderização
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  win.webContents.openDevTools();
}


// Sair quando todas as janelas forem fechadas, exceto no macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

// Criar a janela quando o app estiver pronto
app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()

    // Gerenciar mensagens do processo principal
    ipcMain.on('request-message', (event) => {
      event.reply('main-process-message', 'Hello from main process')
    })
  }
})

app.whenReady().then(createWindow)
