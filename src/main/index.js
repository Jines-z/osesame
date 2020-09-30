const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const ipcMain = require('./ipcMain')
const isDev = process.env.NODE_ENV === 'development'

const createWindow = () => {
    Menu.setApplicationMenu(null)
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        show: false,
        center: true,
        frame: false,
        icon: path.join(__dirname, 'icons', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'ipcRenderer.js'),
            enableRemoteModule: false
        }
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/#/')
    } else {
        mainWindow.loadURL(path.join(__dirname, '../../', 'dist', 'index.html'))
    }
    new ipcMain(mainWindow)
}

app.disableHardwareAcceleration()
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})
