import React, { FC } from 'react'

const Empty: FC = () => {
    return (
        <div className='w100p tc mt-100'>
            <span className='iconfont icon-jinggao c-dark f16'></span>
            <span className='c-dark ml-5'>你搜的是啥啊，根本没有东西啊~</span>
        </div>
    )
}

export default Empty
