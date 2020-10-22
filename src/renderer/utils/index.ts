import dayjs from 'dayjs'

export const createId = (): string => {
    return Number(Math.random().toString().substr(3, 1) + Date.now()).toString(36)
}

export const clipboard = (str: string): Promise<void> => {
    return new Promise(resolve => {
        const input = document.createElement('input')
        input.value = str
        input.style.cssText = `
            position: absolute;
            top: -10000px;
            left: -10000px;
        `
        document.body.appendChild(input)
        input.select()
        document.execCommand('Copy')
        document.body.removeChild(input)
        resolve()
    })
}

export const renderTime = (time: string): string => {
    return dayjs(Number(time)).format('YYYY-MM-DD HH:mm')
}
