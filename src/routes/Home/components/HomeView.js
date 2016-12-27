/**
 * Created by xwatson on 2016/12/9.
 */
import './HomeView.scss'
import React from 'react'
import { FormattedMessage } from 'react-intl'

export class HomeView extends React.Component {
    render() {
        return (
            <div>
                <h3><FormattedMessage id="Home.Welcome" defaultMessage="欢迎！" /></h3>
            </div>
        )
    }
}

export default HomeView
