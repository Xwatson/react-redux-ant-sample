/**
 * Created by xwatson on 2016/12/28.
 */

import { injectReducer } from '../../store/reducers'
// import Login from './components/Login'

export default (store) => ({
    // component : Login
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Login = require('./containers/LoginContainer').default
            const reducer = require('./modules/login').default
            injectReducer(store, { key: 'User', reducer })
            cb(null, Login)
        }, 'login')
    }
})
