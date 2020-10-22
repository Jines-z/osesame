import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Menu, message } from 'antd'
import router from '@/router/config'
import MenuItem from '@/components/SideMenuItem'

@inject('Root', 'Logins', 'Notes')
class SideMenu extends Component<IProps> {
    state = {
        keys: ['/']
    }

    UNSAFE_componentWillMount(): void {
        this.selectKey()
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps): void {
        if (this.props.location.pathname != nextProps.location.pathname) {
            this.selectKey()
        }
    }

    selectKey = (): void => {
        const keys = []
        keys.push(this.props.history.location.pathname)
        this.setState({ keys: keys })
    }

    onSelect = ({ key }: any): void => {
        const { history, Root, Logins, Notes } = this.props
        if (key === '/login') {
            Root.setPassword('')
            Logins.setSelectId(-1)
            Notes.setSelectId(-1)
        }
        if (key === '/setting') {
            message.warning('正在开发中，敬请期待！')
            return
        }
        history.push(key)
    }

    render(): IReactNode {
        return (
            <Fragment>
                <Menu
                    mode='inline'
                    theme='dark'
                    onSelect={this.onSelect}
                    selectedKeys={this.state.keys}
                    defaultOpenKeys={['/' + this.state.keys[0].split('/')[1]]}
                >
                    {router.map(item =>
                        <Menu.Item key={item.path}>
                            <MenuItem icon={item.icon} name={item.name} />
                        </Menu.Item>
                    )}
                </Menu>
                <Menu
                    className='absolute left-0 bottom-0'
                    mode='inline'
                    theme='dark'
                    onSelect={this.onSelect}
                    selectedKeys={this.state.keys}
                >
                    <Menu.Item key='/login'>
                        <MenuItem icon='suoding' name='锁定' />
                    </Menu.Item>
                    <Menu.Item key='/setting'>
                        <MenuItem icon='huabanfuben' name='设置' />
                    </Menu.Item>
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(SideMenu)
