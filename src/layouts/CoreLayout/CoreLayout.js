/**
 * Created by xwatson on 2016/12/8.
 */
import React from 'react'
import { browserHistory } from 'react-router'
import { LocaleProvider, Radio } from 'antd'
import LeftMenu from '../../components/LeftMenu'
import Breadcrumb from '../../components/Breadcrumb'
import './CoreLayout.scss'
import '../../styles/main.scss'
import enUS from 'antd/lib/locale-provider/en_US'
import moment from 'moment'
moment.locale('en')

export class CoreLayout extends React.Component {
    constructor(props) {
        super(props)
        this.changeLocale = this.changeLocale.bind(this)
    }
    state = {
        locale: enUS
    }
    changeLocale(e) {
        const localeValue = e.target.value
        this.setState({ locale: localeValue })
        if (!localeValue) {
            moment.locale('zh-cn')
        } else {
            moment.locale('en')
        }
        console.log(moment(1316116057189).fromNow())
        browserHistory.replace(browserHistory.getCurrentLocation())
    }
    render() {
        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">&nbsp;</div>
                    <LeftMenu />
                </aside>
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <Radio.Group style={{ float:'right' }} defaultValue={enUS} onChange={this.changeLocale}>
                            <Radio.Button key="en" value={enUS}>English</Radio.Button>
                            <Radio.Button key="cn">中文</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb />
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <LocaleProvider locale={this.state.locale}>
                                {this.props.children}
                            </LocaleProvider>

                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        OBORCloud 版权所有 © 2016
                    </div>
                </div>
            </div>
        )
    }
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default CoreLayout
