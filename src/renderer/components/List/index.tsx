import React, { FC } from 'react'
import cls from 'classnames'
import { TYPE } from '@/constant'
import { renderTime } from '@/utils'
import './index.less'

interface Props {
    list: Array<LoginInfo | NoteInfo>;
    selectId: string;
    showType?: boolean;
    onClick: (id: string) => void;
}

interface RowProps {
    id: string;
    text1: string;
    text2?: string;
}

const List: FC<Props> = ({ list = [], selectId, onClick, showType = false }) => {

    const logins = list.filter(x => x.type === TYPE.LOGINS)
    const notes = list.filter(x => x.type === TYPE.NOTES)

    const click = (id: string): void => {
        onClick(id)
    }

    const Row: FC<RowProps> = ({ id, text1, text2 }) => {
        return (
            <div
                className={
                    cls(
                        'row w100p df flex-column pt-10 pb-10 pr-18 cur-p bb',
                        { active: selectId === id }
                    )
                }
                onClick={(): void => click(id)}
            >
                <div className='f16 w100p ellipsis'>{text1}</div>
                <div className='f12 w100p ellipsis'>{text2}</div>
            </div>
        )
    }

    return (
        <div className='List w100p h100p pb-40 border-box ov-a'>
            {showType && logins.length > 0 && <div className='f18 fw6'>账号：</div>}
            {logins.map((item: any) =>
                <Row
                    key={item.id}
                    id={item.id}
                    text1={item.name}
                    text2={item.username}
                />
            )}
            {showType && notes.length > 0 && <div className={cls('f18 fw6', { 'pt-10': logins.length })}>笔记：</div>}
            {notes.map((item: any) =>
                <Row
                    key={item.id}
                    id={item.id}
                    text1={item.title}
                    text2={renderTime(item.createTime)}
                />
            )}
        </div>
    )
}

export default List
