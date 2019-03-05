/**
 * Created by xwatson on 2016/12/9.
 */
import '../styles/base.less'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import history from '../history'
import createStore from '../store/createStore'
import BasicLayout from '../layouts/BasicLayout'
import UserLayout from '../layouts/UserLayout'

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
export const store = createStore(initialState)

export default () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <Route path="/" component={BasicLayout} />
          <Route path="*" component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>
)
