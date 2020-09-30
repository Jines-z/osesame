import React, { FC, ChangeEvent } from 'react'
import { Input } from 'antd'

interface Props {
    type: string;
    placeholder?: string;
    autoFocus?: boolean;
    value?: string;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onPressEnter: (value: string) => void;
}

const Search: FC<Props> = ({ type, placeholder, value, onChange, onPressEnter, autoFocus, className }) => {
    const change = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e)
    }
    const pressEnter = (): void => {
        if (!value) {
            return
        }
        onPressEnter(value)
    }
    return (
        <div className={'w100p relative ' + className}>
            <Input
                autoFocus={autoFocus}
                type={type || 'text'}
                placeholder={placeholder || '请输入'}
                style={{ paddingRight: 30 }}
                value={value}
                onChange={change}
                onPressEnter={pressEnter}
            />
            <span
                className='f14 h14 lh14 absolute absolute--middle right-10 iconfont icon-sousuo cur-p'
                style={{ color: '#d9d9d9' }}
                onClick={pressEnter}
            />
        </div>
    )
}

export default Search
