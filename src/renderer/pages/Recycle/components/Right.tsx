import React, { FC } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from 'antd'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { TYPE } from '@/constant'

interface Props {
    Root: IProps;
    Recycles: IProps;
}

const Right: FC<Props> = ({ Root, Recycles }) => {

    const { selectId } = Recycles
    const { data, setData, path } = Root
    const recycle = cloneDeep(data.recycles.find((x: any) => x.id === selectId))

    const restores = (): void => {
        const recycleName = recycle.type === TYPE.LOGINS ? '账号' : '笔记'
        Modal.confirm({
            title: <span className='fw9'>确定还原该{recycleName}吗？</span>,
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                switch (recycle.type) {
                    case TYPE.LOGINS:
                        data.logins.push(recycle)
                        break
                    case TYPE.NOTES:
                        data.notes.push(recycle)
                        break
                    default:
                        break
                }
                const index = data.recycles.findIndex((x: any) => x.id === selectId)
                data.recycles.splice(index, 1)
                setData(data)
                await IPC.writeFile(path, JSON.stringify(data))
            }
        })
    }

    const del = (): void => {
        const recycleName = recycle.type === 1 ? '账号' : '笔记'
        Modal.confirm({
            title: <span className='fw9'>确定删除该{recycleName}吗？</span>,
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                const index = data.recycles.findIndex((x: any) => x.id === selectId)
                data.recycles.splice(index, 1)
                setData(data)
                await IPC.writeFile(path, JSON.stringify(data))
            }
        })
    }

    if (recycle) {
        const { title, name, createTime, deleteTime, type } = recycle
        return (
            <div className='Notes_Right w100p h100p pt-15 pl-48 pr-28 relative'>
                <div className='scroll-bar mh85p pr-20 ov-a'>
                    {type === TYPE.LOGINS && <div className='w100p break f24 tj mb-20'>{name}</div>}
                    {type === TYPE.NOTES && <div className='w100p break f24 tj mb-20'>{title}</div>}
                    <div className='w100p f12'>创建日期：{dayjs(Number(createTime)).format('YYYY-MM-DD HH:mm')}</div>
                    <div className='w100p f12'>删除日期：{dayjs(Number(deleteTime)).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className='absolute right-25 bottom-20'>
                    <div className='cur-p f15 dib' onClick={restores}>
                        <span className='iconfont icon-huanyuan mr-6 c-dark fw4'></span>
                        <span>还原</span>
                    </div>
                    <div className='cur-p f15 dib ml-25' onClick={del}>
                        <span className='iconfont icon-huishouzhan mr-6 c-dark fw4'></span>
                        <span>彻底删除</span>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default inject('Root', 'Recycles')(observer<any>(Right))
