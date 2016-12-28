/**
 * Created by xwatson on 2016/12/28.
 */
import './AuthLayout.scss'
import React from 'react'
import { LocaleProvider, Radio } from 'antd'
import { addLocaleData, IntlProvider } from 'react-intl'
import BaseLayout from '../Base/BaseLayout'
import enUS from '../../localesEntry/en-US'
import zhCN from '../../localesEntry/zh-CN'
addLocaleData(enUS.data)

export default class AuthLayout extends BaseLayout {
    constructor(props) {
        super(props)
        this.changeLocale = this.changeLocale.bind(this)
    }
    state = {
        locale: enUS
    }
    static propTypes = {
        children: React.PropTypes.any
    }
    render() {
        return (
            <LocaleProvider locale={this.state.locale.antd}>
                <IntlProvider locale={this.state.locale.locale} messages={this.state.locale.messages}>
                    <div className="auth-layout">
                        <Radio.Group style={{ float: 'right' }} defaultValue={enUS} onChange={this.changeLocale}>
                            <Radio.Button key="en" value={enUS}>English</Radio.Button>
                            <Radio.Button key="cn" value={zhCN}>中文</Radio.Button>
                        </Radio.Group>
                        {this.props.children}
                    </div>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}
