/**
 * Created by xwatson on 2016/12/9.
 */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { browserHistory } from 'react-router'
import { updateLocation } from './location'
import DevTools from '../containers/DevTools'

export default (initialState = {}) => {
    const middleware = [thunk]
    const enhancers = []
    if (__DEV__) {
        const devToolsExtension = window.devToolsExtension
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        } else {
            enhancers.push(DevTools.instrument())
        }
    }

    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}
    // 监听地址
    store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}
