/**
 * Created by xwatson on 2016/12/28.
 */
import React from 'react'
import { browserHistory } from 'react-router'
import { addLocaleData } from 'react-intl'
import enUS from '../../localesEntry/en-US'
import zhCN from '../../localesEntry/zh-CN'
import moment from 'moment'
moment.locale('en')

export default class BaseLayout extends React.Component {
    changeLocale(e) {
        const localeValue = e.target.value
        this.setState({ locale: localeValue })
        if (localeValue.locale === 'zh-CN') {
            moment.locale('zh-cn')
            addLocaleData(zhCN.data)
        } else if (localeValue.locale === 'en-US') {
            moment.locale('en')
            addLocaleData(enUS.data)
        }
        browserHistory.replace(browserHistory.getCurrentLocation())
    }
}
