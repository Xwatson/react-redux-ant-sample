/**
 * Created by xwatson on 2016/12/8.
 */
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import ItemsRoute from './Items'


export const createRoutes = (store) => ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home,
    childRoutes : [
        ItemsRoute(store),
    ]
})

export default createRoutes
