export const createId = (): string => {
    return Number(Math.random().toString().substr(3, 1) + Date.now()).toString(36)
}
