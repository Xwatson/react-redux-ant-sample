/**
 * Created by xwatson on 2016/12/8.
 */
import CoreLayout from '../layouts/CoreLayout'
import AuthLayout from '../layouts/AuthLayout'
import Home from './Home'
import Login from './Login'
import ItemsRoute from './Items'

export const createRoutes = (store) => ([
    {
        path: '/',
        component: CoreLayout,
        indexRoute: Home,
        childRoutes: [
            ItemsRoute(store)
        ]
    }, {
        path: '/login',
        component: AuthLayout,
        indexRoute: Login(store),
        childRoutes: [

        ]
    }
])

export default createRoutes
