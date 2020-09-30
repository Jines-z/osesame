import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import TitleBar from '@/components/TitleBar'
import Setting from './components/Setting'
import Username from './components/Username'
import Password from './components/Password'
import logo from '@/statics/images/logo.png'

@inject('Login', 'Root')
@observer
class LoginComponent extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    componentDidMount(): void {
        const { Login, Root } = this.props
        const { path } = Root
        if (IPC.existFile(path)) {
            Login.setStep(2)
            const data = JSON.parse(IPC.readFile(path))
            Root.setData(data)
            Root.setUsername(data.username)
        }
    }

    render(): IReactNode {
        const { step } = this.props.Login
        return (
            <div className='Login_wrap w100p h100p bgc-common'>
                <TitleBar color='black' />
                {step === 2 && <Setting />}
                <div className='w250 h180 absolute absolute--fill tc'>
                    <img className='w100 mb-20' src={logo} />
                    {step === 1 && <Username />}
                    {step === 2 && <Password />}
                </div>
            </div>
        )
    }
}

export default LoginComponent
