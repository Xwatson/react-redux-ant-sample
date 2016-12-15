/**
 * Created by xwatson on 2016/12/9.
 */
import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
const config = require('../../config/config.json')

class AppContainer extends Component {
    static propTypes = {
        routes : PropTypes.object.isRequired,
        store  : PropTypes.object.isRequired
    }

    static host = {
        BASE_API_URL:config[process.env.NODE_ENV.toUpperCase()].apiHost
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const { routes, store } = this.props

        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={browserHistory} children={routes} />
                </div>
            </Provider>
        )
    }
}

export default AppContainer
