/**
 * Created by xwatson on 2016/12/8.
 */
import React from 'react'
import LeftMenu from '../../components/LeftMenu'
import Breadcrumb from '../../components/Breadcrumb'
import './CoreLayout.scss'
import '../../styles/main.scss'

export const CoreLayout = ({ children }) => (
    <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
            <div className="ant-layout-logo">&nbsp;</div>
            <LeftMenu />
        </aside>
        <div className="ant-layout-main">
            <div className="ant-layout-header">Header</div>
            <div className="ant-layout-breadcrumb">
                <Breadcrumb />
            </div>
            <div className="ant-layout-container">
                <div className="ant-layout-content">
                    {children}
                </div>
            </div>
            <div className="ant-layout-footer">
                OBORCloud 版权所有 © 2016
            </div>
        </div>
    </div>
)

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default CoreLayout
