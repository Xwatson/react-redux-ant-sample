/**
 * Created by xwatson on 2016/12/8.
 */
import React from 'react'
import { LocaleProvider, Icon } from 'antd'
import { IntlProvider } from 'react-intl'
import LeftMenu from '../../components/LeftMenu'
import Breadcrumb from '../../components/Breadcrumb'
import BaseLayout from '../Base/BaseLayout'
import './CoreLayout.scss'
import '../../styles/main.scss'
import LangSwitch from '../../components/LangSwitch'

const lMeuns = {
    theme: 'dark', // 主题
    defaultOpenKeys: ['sub1'], // 默认打开的subs
    subs: [
        {
            key: 'sub1',
            name: '商品',
            title: <span><Icon type="mail" /><span>商品</span></span>,
            items: [
                {
                    router: '/',
                    name: '首页'
                },
                {
                    router: '/items',
                    name: '列表'
                }
            ]
        }
    ]
}

export class CoreLayout extends BaseLayout {

    render() {
        return (
            <LocaleProvider locale={this.state.locale.antd}>
                <IntlProvider locale={this.state.locale.locale} messages={this.state.locale.messages}>
                    <div className="ant-layout-aside">
                        <aside className="ant-layout-sider">
                            <div className="ant-layout-logo">&nbsp;</div>
                            <LeftMenu menus={lMeuns} />
                        </aside>
                        <div className="ant-layout-main">
                            <div className="ant-layout-header">
                                <LangSwitch changeLocale={this.changeLocale} />
                            </div>
                            <div className="ant-layout-breadcrumb">
                                <Breadcrumb menus={lMeuns} />
                            </div>
                            <div className="ant-layout-container">
                                <div className="ant-layout-content">
                                    {this.props.children}
                                </div>
                            </div>
                            <div className="ant-layout-footer">
                                OBORCloud 版权所有 © 2016
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default CoreLayout
