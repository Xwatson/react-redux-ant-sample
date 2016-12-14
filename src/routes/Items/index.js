/**
 * Created by xwatson on 2016/12/12.
 */
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'items',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Zen = require('./containers/ItemsContainer').default
            const reducer = require('./modules/items').default
            injectReducer(store, { key: 'items', reducer })
            cb(null, Zen)
        })
    }
})