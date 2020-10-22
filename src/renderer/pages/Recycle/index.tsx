import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Wrap from '@/components/Wrap'
import Left from './components/Left'
import Right from './components/Right'

@observer
class Recycle extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render(): IReactNode {
        return (
            <Wrap
                left={<Left />}
                right={<Right />}
                showAdd={false}
                showAddTip={false}
            />
        )
    }
}

export default Recycle

