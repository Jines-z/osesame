import React, { FC } from 'react'
import { inject, observer } from 'mobx-react'
import { Tooltip, Modal } from 'antd'

interface Props {
    Root: IProps;
    Login: IProps;
}

const Setting: FC<Props> = ({ Root, Login }) => {
    const { path, setUsername, setPassword, setData, data } = Root
    const { setStep } = Login
    const prev = (): void => {
        setStep(1)
        setPassword('')
    }
    const logout = (): void => {
        Modal.confirm({
            title: <span className='fw9'>您确定要注销账户吗？</span>,
            content: '注销后，将会永久删除所有数据！',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                IPC.deleteFile(path)
                setUsername('')
                setData(null)
                prev()
            }
        })
    }
    const onClick = (): void => {
        if (data) {
            logout()
        } else {
            prev()
        }
    }
    return (
        <Tooltip
            trigger='hover'
            title={<span className='f12 cur-p' onClick={onClick}>{data ? '注销' : '上一步'}</span>}
            placement='topRight'
            arrowPointAtCenter
        >
            <span
                className='f14 h14 lh14 iconfont icon-shezhi c-dark cur-p absolute right-15 bottom-15'
            />
        </Tooltip>
    )
}

export default inject('Root', 'Login')(observer<any>(Setting))
