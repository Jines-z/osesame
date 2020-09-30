const { ipcMain } = require('electron')
const os   = require('os')
const path = require('path')
const fs   = require('fs')

class Main {
    constructor(mainWindow) {
        this.mainWindow = mainWindow
        this.osPath = path.resolve(os.homedir(), '.osesame')
        this.window()
        this.system()
        this.devTools()
        this.fileAndDir()
    }
    window() {
        ipcMain.on('min', e => this.mainWindow.minimize())
        ipcMain.on('max', e => {
            if (this.mainWindow.isMaximized()) {
                this.mainWindow.unmaximize()
            } else {
                this.mainWindow.maximize()
            }
        })
        ipcMain.on('close', e => this.mainWindow.close())
        ipcMain.on('reload', e => this.mainWindow.reload())
    }
    system() {
        ipcMain.on('getFilePath', e => {
            e.returnValue = this.osPath
        })
        ipcMain.on('getHomePath', e => {
            e.returnValue = os.homedir()
        })
    }
    devTools() {
        ipcMain.on('toggleDevTools', e => this.mainWindow.toggleDevTools())
    }
    fileAndDir() {
        ipcMain.on('existFile', (e, path) => {
            e.returnValue = fs.existsSync(path)
        })
        ipcMain.on('writeFile', (e, path, text) => {
            try {
                fs.writeFileSync(path, text)
            } catch (err) {
                e.returnValue = false
                return
            }
            e.returnValue = true
        })
        ipcMain.on('deleteFile', (e, path) => {
            e.returnValue = fs.unlinkSync(path)
        })
        ipcMain.on('readFile', (e, path) => {
            e.returnValue = fs.readFileSync(path, 'utf-8')
        })
    }
}

module.exports = Main
