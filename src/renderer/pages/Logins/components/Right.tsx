import React, { FC, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import PasswordLevel from '@/components/PasswordLevel'
import LoginsModal from './LoginsModal'

interface Props {
    Root: IProps;
    Logins: IProps;
}

const Right: FC<Props> = ({ Root, Logins }) => {

    const { selectId } = Logins
    const { data, setData, password, path } = Root
    const login = data.logins.find((x: any) => x.id === selectId)
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState({})

    const editor = (): void => {
        setValue({
            name: login.name,
            username: login.username,
            password: login.realPassword,
            remark: login.remark
        })
        setVisible(true)
    }

    const onOk = async(res: LoginInfo): Promise<any> => {
        const _res = cloneDeep(res)
        _res.password = CryptoJS.AES.encrypt(_res.password, password).toString()
        const index = data.logins.findIndex((x: any) => x.id === selectId)
        data.logins[index] = { ...data.logins[index], ..._res }
        data.logins[index].editorTime = dayjs().valueOf().toString()
        setData(data)
        await IPC.writeFile(path, JSON.stringify(data))
        setVisible(false)
    }

    const del = (): void => {
        Modal.confirm({
            title: <span className='fw9'>确定删除该账号吗？</span>,
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                const index = data.logins.findIndex((x: any) => x.id === selectId)
                const recycle = data.logins.splice(index, 1)
                data.recycle.push(recycle)
                setData(data)
                await IPC.writeFile(path, JSON.stringify(data))
            }
        })
    }

    if (login) {
        login.realPassword = CryptoJS.AES.decrypt(login.password, Root.password).toString(CryptoJS.enc.Utf8)
        const { name, username, realPassword, createTime, editorTime, remark } = login
        return (
            <div className='Logins_Right w100p h100p pt-65 pl-18 pr-48 relative'>
                <div className='w100p h60 clearfix'>
                    <div className='w40p pr-10 fl tr df items-center justify-end'>
                        <div className='w60 h60 bgc-link df items-center justify-center c-white f32'>{name[0]}</div>
                    </div>
                    <div className='w60p h100p lh60 fl ellipsis f24 pl-10'>{name}</div>
                </div>
                <div className='w100p clearfix mt-40'>
                    <div className='w40p fl tr pr-10'>邮箱/手机号/用户名</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{username}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>密码</div>
                    <div className='w60p fl pl-10 c-dark-xl'>
                        <div>{realPassword}</div>
                        <PasswordLevel password={realPassword} />
                    </div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>创建日期</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{dayjs(Number(createTime)).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>最后修改日期</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{dayjs(Number(editorTime)).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>备注</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{remark || '-'}</div>
                </div>
                <div className='absolute right-25 bottom-20'>
                    <div className='cur-p f15 dib' onClick={del}>
                        <span className='iconfont icon-huishouzhan mr-6 c-dark fw4'></span>
                        <span>删除</span>
                    </div>
                    <div className='cur-p f15 fw5 dib ml-25' onClick={editor}>
                        <span className='iconfont icon-xiugai-copy mr-6 c-dark fw4'></span>
                        <span>编辑</span>
                    </div>
                </div>
                <LoginsModal
                    visible={visible}
                    value={value}
                    onOk={onOk}
                    onCancel={(): void => setVisible(false)}
                />
            </div>
        )
    } else {
        return null
    }
}

export default inject('Root', 'Logins')(observer<any>(Right))
