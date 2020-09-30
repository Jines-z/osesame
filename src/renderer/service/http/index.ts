import Fly from 'flyio'
import store from '@/store'
import { message } from 'antd'

let num = 0
const done = (): void => {
    if (num > 0) {
        num -= 1
    }
    if (num == 0) {
        store.Root.setLoading(false)
    }
}

Fly.interceptors.request.use(request => {
    request.timeout = 10000
    store.Root.setLoading(true)
    num += 1
    return request
})

Fly.interceptors.response.use(
    response => {
        done()
        return response
    },
    err => {
        done()
        message.error(`${err.status} ${err.message}`)
    }
)

export default {
    get(url: string, param: IParam): IRPromise {
        return Fly.get(url, param)
    }
}
