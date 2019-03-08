/**
 * Created by xwatson on 2016/12/8.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader' // eslint-disable-line
import App from './containers/AppContainer'

setConfig({ pureSFC: true })
const MOUNT_NODE = document.getElementById('root')

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    MOUNT_NODE,
  )
}

render(App)
if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => {
    const NextApp = require('./containers/AppContainer').default // eslint-disable-line
    render(NextApp)
  })
}
