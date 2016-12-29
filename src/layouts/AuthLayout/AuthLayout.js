/**
 * Created by xwatson on 2016/12/28.
 */
import './AuthLayout.scss'
import React from 'react'
import { LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import BaseLayout from '../Base/BaseLayout'
import LangSwitch from '../../components/LangSwitch'

export default class AuthLayout extends BaseLayout {
    static propTypes = {
        children: React.PropTypes.any
    }
    render() {
        return (
            <LocaleProvider locale={this.state.locale.antd}>
                <IntlProvider locale={this.state.locale.locale} messages={this.state.locale.messages}>
                    <div className="auth-layout">
                        <LangSwitch changeLocale={this.changeLocale} />
                        {this.props.children}
                    </div>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}
