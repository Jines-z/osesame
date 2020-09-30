import React, { FC, Fragment } from 'react'

interface Props {
    icon: string;
    name: string;
}

const MenuItem: FC<Props> = ({ icon, name }) => {
    return (
        <Fragment>
            <span className={`iconfont icon-${icon} mr-18`}></span>
            <span>{name}</span>
        </Fragment>
    )
}

export default MenuItem
