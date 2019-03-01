/**
 * Created by xwatson on 2016/12/8.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer'

const MOUNT_NODE = document.getElementById('root')

const render = () => {
  ReactDOM.render(
    <AppContainer />,
    MOUNT_NODE,
  )
}

render()
