import { observable, action } from 'mobx'

class Notes {
    @observable selectId = -1
    @action setSelectId = (selectId: number): void => {
        this.selectId = selectId
    }
}

export default new Notes()
