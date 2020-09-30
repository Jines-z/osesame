import React, { FC } from 'react'
import { inject, observer } from 'mobx-react'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import PasswordLevel from '@/components/PasswordLevel'

interface Props {
    Root: IProps;
    Logins: IProps;
}

const Right: FC<Props> = ({ Root, Logins }) => {
    const { selectId } = Logins
    const { data } = Root
    const login = data.logins.find((x: any) => x.id === selectId)
    if (login) {
        login.realPassword = CryptoJS.AES.decrypt(login.password, Root.password).toString(CryptoJS.enc.Utf8)
        const { name, username, realPassword, createTime, editorTime, remark } = login
        return (
            <div className='w100p h100p pt-65 pl-18 pr-48'>
                <div className='w100p h70 clearfix'>
                    <div className='w40p pr-10 fl tr df items-center justify-end'>
                        <div className='w70 h70 bgc-link df items-center justify-center c-white f32'>{name[0]}</div>
                    </div>
                    <div className='w60p h100p lh70 fl ellipsis f24 pl-10'>{name}</div>
                </div>
                <div className='w100p clearfix mt-40'>
                    <div className='w40p fl tr pr-10'>邮箱/手机号/用户名</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{username}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>密码</div>
                    <div className='w60p fl pl-10 c-dark-xl'>
                        <div className='mb-10'>{realPassword}</div>
                        <PasswordLevel password={realPassword} />
                    </div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>创建日期</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>修改日期</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{dayjs(editorTime).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className='w100p clearfix mt-15'>
                    <div className='w40p fl tr pr-10'>备注</div>
                    <div className='w60p fl pl-10 c-dark-xl'>{remark || '-'}</div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default inject('Root', 'Logins')(observer<any>(Right))
