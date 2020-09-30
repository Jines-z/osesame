import React, { FC } from 'react'
import logo_black from '@/statics/images/logo_black.png'
import logo_white from '@/statics/images/logo_white.png'
import './index.less'

interface BarProps {
    color: 'black' | 'white';
}

const TitleBar: FC<BarProps> = ({ color }) => {
    return (
        <div className='TitleBar w100p h30 fixed left-0 top-0 df z999'>
            <div className='drop flex1'>
                <img
                    className='h12 ml-18 mt-14'
                    src={color === 'black' ? logo_black : logo_white}
                />
            </div>
            <div className='tools h100p df items-center justify-end'>
                <div
                    className='w46 h100p df items-center justify-center'
                    onClick={IPC.min}
                >
                    <span className='dib w12 bgc-black' style={{ height: 3, transform: 'scaleY(.4)' }}></span>
                </div>
                <div
                    className='w46 h100p df items-center justify-center'
                    onClick={IPC.max}
                >
                    <span className='f12 iconfont icon-zuidahua'></span>
                </div>
                <div
                    className='w46 h100p df items-center justify-center'
                    onClick={IPC.close}
                >
                    <span className='f12 iconfont icon-guanbi'></span>
                </div>
            </div>
        </div>
    )
}

export default TitleBar
