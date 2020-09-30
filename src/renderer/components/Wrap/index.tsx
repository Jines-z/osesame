import React, { FC } from 'react'
import arrow from '@/statics/images/arrow.png'
import './index.less'

interface Props {
    left: IReactNode;
    right: IReactNode;
    showAddTip: boolean;
    add: () => void;
}

const Wrap: FC<Props> = ({ left, right, showAddTip, add }) => {

    const onClick = (): void => {
        add()
    }

    return (
        <div className='Wrap w100p h100p relative clearfix'>
            <div className='left fl h100p pl-18 pr-18 pb-45 pt-45 ov-a'>{left}</div>
            <div className='right fl h100p pb-45 pt-30 bgc-common bl ov-a'>{right}</div>
            <div className='w100p h45 absolute left-0 bottom-0 bt df justify-between bgc-white'>
                <div className='left h100p df items-center cur-p pl-18' onClick={onClick}>
                    <span className='iconfont icon-jiahao f16 h16 lh16 mr-10'></span>
                    <span className='f16'>添加</span>
                </div>
                <div className='right h100p df items-center justify-end pr-18 bgc-common bl'>
                    <span>记性是个好东西~</span>
                </div>
                {showAddTip &&
                    <div className='absolute w250 bottom-55 left-20 f16'>
                        <img className='w30' src={arrow} />
                        <div className='tc absolute bottom-10 left-25'>
                            <div>点击下方的加号</div>
                            <div>添加一条数据</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Wrap
