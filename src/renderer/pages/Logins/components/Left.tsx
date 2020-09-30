import React, { FC, useState, ChangeEvent } from 'react'
import { inject, observer } from 'mobx-react'
import cls from 'classnames'
import Search from '@/components/Search'

interface Props {
    Root: IProps;
    Logins: IProps;
}

const Left: FC<Props> = ({ Root, Logins }) => {

    const { logins = [] } = Root.data
    const { selectId, setSelectId } = Logins
    const [search, setSearch] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value)
    }

    const onPressEnter = (value: string): void => {
        console.log(value)
    }

    return (
        <div className='Logins_Left w100p h100p pt-52 relative'>
            <Search
                className='w100p absolute top-0 left-0'
                type='text'
                placeholder='搜索'
                value={search}
                onChange={onChange}
                onPressEnter={onPressEnter}
            />
            <div className='w100p bb' />
            <div className='w100p h100p ov-a'>
                {logins.map((item: any, index: number) =>
                    <div
                        key={item.id}
                        className={
                            cls(
                                'login w100p df flex-column pt-10 pb-10 pr-18 cur-p',
                                { bb: index !== logins.length - 1 },
                                { active: selectId === item.id }
                            )
                        }
                        onClick={(): void => setSelectId(item.id)}
                    >
                        <div className='f16 w100p ellipsis'>{item.name}</div>
                        <div className='f12 w100p ellipsis'>{item.username}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default inject('Root', 'Logins')(observer<any>(Left))
