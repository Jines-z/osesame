import React, { FC, ChangeEvent } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import CryptoJS from 'crypto-js'
import { message, Modal } from 'antd'
import Field from './Field'

interface Props {
    Root: IProps;
    history: IProps;
}

const Password: FC<Props> = ({ Root, history }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const _value = e.target.value
        if (!/^\S*$/.test(_value)) {
            message.error('不能含有空格')
            return
        }
        Root.setPassword(_value)
    }
    const login = async(): Promise<void> => {
        const { username, password, key, path, data, setData } = Root
        const _password = CryptoJS.HmacMD5(password, username + key).toString()
        if (data) {
            if (_password === data.password) {
                history.push('/logins')
            } else {
                message.error('密码错误')
            }
        } else {
            const data = {
                username,
                password: _password,
                logins: [],
                notes: [],
                recycles: []
            }
            await IPC.writeFile(path, JSON.stringify(data))
            setData(data)
            history.push('/logins')
        }
    }
    const onPressEnter = (value: string): void => {
        if (!value) {
            return
        }
        if (Root.data) {
            login()
        } else {
            Modal.confirm({
                title: <span className='fw9'>请您牢记这个密码！</span>,
                content: '密码将用于后续所有数据的加密，如果忘记密码将会丢失所有数据！',
                cancelText: '再想想',
                okText: '我知道了',
                onOk() {
                    login()
                }
            })
        }
    }
    return (
        <Field
            type='password'
            autoFocus={true}
            placeholder='请输入密码'
            value={Root.password}
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
    )
}

export default withRouter(inject('Root')(observer<any>(Password)))
