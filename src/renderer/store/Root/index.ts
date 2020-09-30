import { observable, action } from 'mobx'

class Root {
    readonly key = 'osesame'
    readonly path = IPC.getFilePath()
    @observable username = ''
    @observable password = ''
    @observable data = null
    @action setUsername = (value: string): void => {
        this.username = value
    }
    @action setPassword = (value: string): void => {
        this.password = value
    }
    @action setData = (value: any): void => {
        this.data = value
    }
}

export default new Root()
