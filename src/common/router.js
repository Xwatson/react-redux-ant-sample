import React, { createElement } from 'react'
import { Spin } from 'antd'
import Loadable from 'react-loadable'

import { injectReducer } from '../store/reducers'
import { store } from '../containers/AppContainer'

const dynamicWrapper = (models, component) => {
  // 注册reduce
  models.forEach(model => (
    injectReducer(store, { key: model, reducer: require(`../models/${model}`).default }) // eslint-disable-line
  ))
  // 如果不是异步架加载
  if (component.toString().indexOf('.then(') < 0) {
    return props => (
      createElement(component().default, {
        ...props,
      })
    )
  }
  return Loadable({
    loader: () => (
      component().then(raw => { // eslint-disable-line
        const Component = raw.default || raw
        return props => (
          createElement(Component, {
            ...props,
          }))
      })
    ),
    loading: () => <Spin size="large" className="global-spin" />,
  })
}

export default {
  '/user': [
    { path: '/user', redirect: '/user/login' },
    {
      path: '/login', component: dynamicWrapper([], import('../pages/Login')),
    },
  ],
  '/': [
    { path: '/', redirect: '/home' },
    { path: '/home', component: dynamicWrapper([], import('../pages/Home')) },
    { path: '/list', component: dynamicWrapper([], import('../pages/List')) },
  ],
}
