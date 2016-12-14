/**
 * Created by xwatson on 2016/12/9.
 */
import { combineReducers } from 'redux'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer