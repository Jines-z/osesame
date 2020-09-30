import React, { FC } from 'react'
import SideMenu from '@/components/SideMenu'

const Left: FC = () => {
    return (
        <div className='h100p left fl bgc-theme relative'>
            <div className='bgc-theme-dark h40'></div>
            <div className='h40 bgc-theme pt-12 pl-18'>
                <span className='iconfont icon-liebiao c-white f15'></span>
            </div>
            <SideMenu />
        </div>
    )
}

export default Left
