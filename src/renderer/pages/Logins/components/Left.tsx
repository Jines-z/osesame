import React, { FC, useState, ChangeEvent } from 'react'
import { inject, observer } from 'mobx-react'
import Search from '@/components/Search'
import List from '@/components/List'

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

    const list = logins.filter((x: LoginInfo): boolean => {
        if (!search) {
            return true
        } else {
            const reg = new RegExp(search, 'i')
            return reg.test(x.name)
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
            <div className='w100p bb' />
            <List
                list={list}
                selectId={selectId}
                onClick={setSelectId}
            />
        </div>
    )
}

export default inject('Root', 'Logins')(observer<any>(Left))
