import React, { FC } from 'react'
import TitleBar from '@/components/TitleBar'
import Left from './components/Left'
import Right from './components/Right'
import './index.less'

const Layouts: FC = () => {
    return (
        <div className='Layouts_wrap w100p h100p clearfix'>
            <TitleBar color='white' />
            <Left />
            <Right />
        </div>
    )
}

export default Layouts
