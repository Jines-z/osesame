import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

const Logins = Loadable({ loader: () => import(/* webpackChunkName: "Logins" */ '@/pages/Logins'), loading: DelayLoading })
const Notes = Loadable({ loader: () => import(/* webpackChunkName: "Notes" */ '@/pages/Notes'), loading: DelayLoading })
const Recycle = Loadable({ loader: () => import(/* webpackChunkName: "Recycle" */ '@/pages/Recycle'), loading: DelayLoading })

export default [{
    name: '登录账号',
    path: '/logins',
    icon: 'yaoshi',
    component: Logins
}, {
    name: '记事本',
    path: '/notes',
    icon: 'jishiben',
    component: Notes
}, {
    name: '回收站',
    path: '/Recycle',
    icon: 'huishouzhan',
    component: Recycle
}]
