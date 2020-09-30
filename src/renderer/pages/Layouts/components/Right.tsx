import React, { FC } from 'react'
import { withRouter } from 'react-router-dom'
import Router from '@/router'

const Right: FC = () => {
    return (
        <div className='right h100p fl'>
            <Router />
        </div>
    )
}

export default withRouter(Right)
