import { observable, action } from 'mobx'

class Logins {
    @observable selectId = -1
    @action setSelectId = (selectId: number): void => {
        this.selectId = selectId
    }
}

export default new Logins()
