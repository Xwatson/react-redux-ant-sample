/**
 * Created by xwatson on 2016/12/28.
 */
import './AuthLayout.scss'
import React from 'react'

export default class AuthLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    }
    render() {
        return (
            <div className="auth-layout">{this.props.children}</div>
        )
    }
}
