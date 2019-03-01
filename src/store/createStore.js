/* global __DEV__ */
/* eslint no-undef: "error" */

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import DevTools from '../containers/DevTools'
import reducers from './reducers'

export default (initialState = {}) => {
  const middleware = [thunk]
  const enhancers = []
  if (__DEV__) {
    const { devToolsExtension } = window
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    } else {
      enhancers.push(DevTools.instrument())
    }
  }

  const store = createStore(
    reducers(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  )
  store.asyncReducers = {}
  // 监听地址
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default // eslint-disable-line
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
