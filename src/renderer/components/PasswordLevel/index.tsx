import React, { FC } from 'react'
import { Progress } from 'antd'

interface Props {
    password: string;
}

type status = 'exception' | 'normal' | 'success'

const PasswordLevel: FC<Props> = ({ password }) => {
    console.log(password)
    console.log(password.length)

    let level = 0
    let status: status = 'exception'
    const num = 20
    if (password.length <= 5) {
        level += num
    } else {
        if (password.length > 5) {
            level += num
        }
        if (password.length > 10) {
            level += num
        }
        if (/\d/.test(password)) {
            level += num
        }
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            level += num
        }
        if (/[!@#$%^&*()_+`~\-=;':"\\{},<>/?\[\]|]/.test(password)) {
            level += num
        }
    }
    switch (level) {
        case 40:
        case 60:
        case 80:
            status = 'normal'
            break
        case 100:
            status = 'success'
            break
        default:
            break
    }

    return (
        <Progress
            type='line'
            percent={level}
            showInfo={false}
            status={status}
        />
    )
}

export default PasswordLevel
