import React, { FC, useState, ChangeEvent } from 'react'
import { inject, observer } from 'mobx-react'
import Search from '@/components/Search'
import List from '@/components/List'
import { TYPE } from '@/constant'

interface Props {
    Root: IProps;
    Recycles: IProps;
}

const Left: FC<Props> = ({ Root, Recycles }) => {

    const { recycles = [] } = Root.data
    const { selectId, setSelectId } = Recycles
    const [search, setSearch] = useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value)
    }

    const list = recycles.filter((x: NoteInfo & LoginInfo): boolean => {
        if (!search) {
            return true
        } else {
            const reg = new RegExp(search, 'i')
            switch (x.type) {
                case TYPE.LOGINS:
                    return reg.test(x.name)
                    break
                case TYPE.NOTES:
                    return reg.test(x.title)
                default:
                    return true
                    break
            }
        }
    })

    return (
        <div className='w100p h100p pt-52 relative'>
            <Search
                className='w100p absolute top-0 left-0'
                type='text'
                placeholder='搜索'
                value={search}
                onChange={onChange}
            />
            <List
                list={list}
                selectId={selectId}
                onClick={setSelectId}
                showType={true}
            />
        </div>
    )
}

export default inject('Root', 'Recycles')(observer<any>(Left))
