/**
 * Created by xwatson on 2016/12/8.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const MOUNT_NODE = document.getElementById('root')

let render = () => {
    const routes = require('./routes/index').default(store)

    ReactDOM.render(
        <AppContainer store={store} routes={routes} />,
        MOUNT_NODE
    )
}

// 启用devTools工具
if (__DEV__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open()
    }
}

// 启用热更新
if (__DEV__) {
    if (module.hot) {
        // Development render functions
        const renderApp = render
        const renderError = (error) => {
            const RedBox = require('redbox-react').default

            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
        }

        render = () => {
            try {
                renderApp()
            } catch (error) {
                renderError(error)
            }
        }

        // 设置热加载模块
        module.hot.accept('./routes/index', () =>
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(MOUNT_NODE)
                render()
            })
        )
    }
}

render()
