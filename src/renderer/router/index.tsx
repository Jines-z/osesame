import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import config from './config'

// @ts-ignore
const Router: FC = () => {
    return (
        config.map(item =>
            <Route key={item.path} path={item.path} component={item.component} exact />
        )
    )
}

export default Router
