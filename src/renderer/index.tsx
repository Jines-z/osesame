import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'slcss'
import 'slcss/css/reset/index'
import '@/styles/antd.less'
import '@/styles/common.less'
import '@/statics/fonts/iconfont.css'
import Pages from '@/pages'

class App extends React.Component {
    render(): IReactNode {
        return (
            <HashRouter>
                <Pages />
            </HashRouter>
        )
    }
}

render(<App />, document.getElementById('root'))

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept()
}
