import { observable, action } from 'mobx'

class Login {
    @observable step = 1
    @action setStep = (step: number): void => {
        this.step = step
    }
}

export default new Login()
