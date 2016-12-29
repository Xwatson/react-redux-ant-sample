/**
 * Created by xwatson on 2016/12/29.
 */
import './LangSwitch.scss'
import React from 'react'
import { Radio } from 'antd'
import enUS from '../../localesEntry/en-US'
import zhCN from '../../localesEntry/zh-CN'

export default class LangSwitch extends React.Component {
    static propTypes = {
        changeLocale: React.PropTypes.func.isRequired
    }
    render() {
        return (
            <Radio.Group className="lang-switch-radios" defaultValue={zhCN} onChange={this.props.changeLocale}>
                <Radio.Button key="cn" value={zhCN}>中文</Radio.Button>
                <Radio.Button key="en" value={enUS}>English</Radio.Button>
            </Radio.Group>
        )
    }
}