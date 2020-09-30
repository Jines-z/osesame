const { ipcRenderer } = require('electron')
const isDev = process.env.NODE_ENV === 'development'

window.IPC = {
    min() {
        ipcRenderer.send('min')
    },
    max() {
        ipcRenderer.send('max')
    },
    close() {
        ipcRenderer.send('close')
    },
    reload() {
        ipcRenderer.send('reload')
    },
    toggleDevTools() {
        ipcRenderer.send('toggleDevTools')
    },
    getFilePath() {
        return ipcRenderer.sendSync('getFilePath')
    },
    getHomePath() {
        return ipcRenderer.sendSync('getHomePath')
    },
    existFile(path) {
        return ipcRenderer.sendSync('existFile', path)
    },
    writeFile(path, text) {
        return new Promise((resolve, reject) => {
            const res = ipcRenderer.sendSync('writeFile', path, text)
            if (res) {
                resolve()
            } else {
                reject()
            }
        })
    },
    deleteFile(path) {
        return ipcRenderer.sendSync('deleteFile', path)
    },
    readFile(path) {
        return ipcRenderer.sendSync('readFile', path)
    }
}

window.addEventListener('keydown', e => {
    const { keyCode, ctrlKey, altKey } = e
    if (keyCode === 123 && isDev) { // F12
        IPC.toggleDevTools()
    }
    if (((ctrlKey && keyCode === 82) || keyCode === 116) && isDev) { // Ctrl + R   F5
        IPC.reload()
    }
    if (altKey && keyCode === 115) { // Alt + F4
        IPC.close()
    }
}, false)
