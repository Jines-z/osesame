import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import cloneDeep from 'lodash/cloneDeep'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import Wrap from '@/components/Wrap'
import Left from './components/Left'
import Right from './components/Right'
import LoginsModal from './components/LoginsModal'
import { createId } from '@/utils'
import { TYPE } from '@/constant'

interface State {
    visible: boolean;
}

@inject('Root')
@observer
class Logins extends Component<IProps, State> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            visible: false
        }
    }

    addLogin = (): void => {
        this.setState({ visible: true })
    }

    onOk = async(res: LoginInfo): Promise<any> => {
        const _res = cloneDeep(res)
        const { Root } = this.props
        const { data, setData, password, path } = Root
        _res.id = createId()
        _res.type = TYPE.LOGINS
        _res.password = CryptoJS.AES.encrypt(_res.password, password).toString()
        _res.createTime = dayjs().valueOf().toString()
        _res.editorTime = dayjs().valueOf().toString()
        if (!data.logins) {
            data.logins = [_res]
        } else {
            data.logins.push(_res)
        }
        setData(data)
        await IPC.writeFile(path, JSON.stringify(data))
        this.setState({ visible: false })
    }

    render(): IReactNode {
        const { Root } = this.props
        const { visible } = this.state
        return (
            <Fragment>
                <Wrap
                    left={<Left />}
                    right={<Right />}
                    showAddTip={!Root.data.logins || Root.data.logins.length === 0}
                    add={this.addLogin}
                />
                <LoginsModal
                    visible={visible}
                    onOk={this.onOk}
                    onCancel={(): void => this.setState({ visible: false })}
                />
            </Fragment>
        )
    }
}

export default Logins

