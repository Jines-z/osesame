import React, { FC, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Provider } from 'mobx-react'
import Layouts from './Layouts'
import Login from './Login'
import store from '@/store'

const Pages: FC<RouteComponentProps> = ({ history }) => {

    useEffect(() => {
        history.push('/login')
    }, [history])

    return (
        <Provider { ...store }>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Layouts} />
            </Switch>
        </Provider>
    )
}

export default withRouter(Pages)
