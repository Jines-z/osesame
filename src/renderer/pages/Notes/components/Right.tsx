import React, { FC, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, message } from 'antd'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import NotesModal from './NotesModal'
import { clipboard } from '@/utils'

interface Props {
    Root: IProps;
    Notes: IProps;
}

const Right: FC<Props> = ({ Root, Notes }) => {

    const { selectId } = Notes
    const { data, setData, password, path } = Root
    const note = cloneDeep(data.notes.find((x: any) => x.id === selectId))
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState({})

    const editor = (): void => {
        setValue({
            title: note.title,
            content: note.realContent
        })
        setVisible(true)
    }

    const onOk = async(res: NoteInfo): Promise<any> => {
        const _res = cloneDeep(res)
        _res.content = CryptoJS.AES.encrypt(_res.content, password).toString()
        const index = data.notes.findIndex((x: any) => x.id === selectId)
        data.notes[index] = { ...data.notes[index], ..._res }
        data.notes[index].editorTime = dayjs().valueOf().toString()
        setData(data)
        await IPC.writeFile(path, JSON.stringify(data))
        setVisible(false)
    }

    const del = (): void => {
        Modal.confirm({
            title: <span className='fw9'>确定删除该笔记吗？</span>,
            cancelText: '取消',
            okText: '确定',
            async onOk() {
                const index = data.notes.findIndex((x: any) => x.id === selectId)
                data.notes[index].deleteTime = dayjs().valueOf().toString()
                const recycle = data.notes.splice(index, 1)
                data.recycles.push(recycle[0])
                setData(data)
                await IPC.writeFile(path, JSON.stringify(data))
            }
        })
    }

    const copy = (): void => {
        clipboard(note.realContent).then(() => {
            message.success('笔记复制成功，快去使用吧~')
        })
    }

    if (note) {
        note.realContent = CryptoJS.AES.decrypt(note.content, Root.password).toString(CryptoJS.enc.Utf8)
        const { title, realContent, createTime, editorTime } = note
        return (
            <div className='Notes_Right w100p h100p pt-15 pl-48 pr-28 relative'>
                <div className='scroll-bar mh85p pr-20 ov-a'>
                    <div className='w100p break f24 tj'>{title}</div>
                    <div className='w100p f15 tj mt-10 mb-15 pre-wrap'>{realContent}</div>
                    <div className='w100p f12'>创建日期：{dayjs(Number(createTime)).format('YYYY-MM-DD HH:mm')}</div>
                    <div className='w100p f12'>修改日期：{dayjs(Number(editorTime)).format('YYYY-MM-DD HH:mm')}</div>
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
                    <div className='cur-p f15 fw5 dib ml-25' onClick={copy}>
                        <span className='iconfont icon-fuzhi mr-6 c-dark fw4'></span>
                        <span>复制</span>
                    </div>
                </div>
                <NotesModal
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

export default inject('Root', 'Notes')(observer<any>(Right))
