const { spawn } = require('child_process')

const spawn_dev = spawn('rs-compiler', ['start'], {
    cwd: process.cwd(),
    stdio: ['ipc', process.stdout, process.stderr],
    shell: process.platform === 'win32',
    detached: false
})

spawn_dev.on('message', res => {
    if (res === 'wdm-cb') {
        spawn('electron', ['src/main'], {
            cwd: process.cwd(),
            stdio: [0, 1, 2],
            shell: process.platform === 'win32',
            detached: false
        })
    }
})
