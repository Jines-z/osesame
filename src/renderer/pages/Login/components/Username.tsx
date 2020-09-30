import React, { FC, ChangeEvent } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import Field from './Field'

interface Props {
    Root: IProps;
    Login: IProps;
}

const Username: FC<Props> = ({ Root, Login }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const _value = e.target.value
        if (/^\d/.test(_value)) {
            message.error('不能以数字开头')
            return
        }
        if (!/^\S*$/.test(_value)) {
            message.error('不能含有空格')
            return
        }
        Root.setUsername(_value)
    }
    const onPressEnter = (value: string): void => {
        if (!value) {
            return
        }
        Login.setStep(2)
    }
    return (
        <Field
            type='text'
            placeholder='请输入用户名'
            value={Root.username}
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
    )
}

export default inject('Root', 'Login')(observer<any>(Username))
