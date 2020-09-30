import React, { FC } from 'react'

const DelayLoading: FC<ILoadable> = ({ error }) => {
    if (error) {
        return <div>Sorry, there was a problem loading the page.</div>
    } else {
        return null
    }
}
export default DelayLoading
