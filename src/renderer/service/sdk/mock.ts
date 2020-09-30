import http from '../http'
import API from '../api'

export default {
    login(param: IParam): IRPromise {
        return http.get(API.LOGIN, param)
    }
}
