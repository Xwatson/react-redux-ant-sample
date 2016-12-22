/**
 * Created by xwatson on 2016/12/9.
 */
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu
const reg = /^(\/)(items)(\/)?/

export default class LeftMenu extends React.Component {
    static propTypes = {
        menus: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.hasClick = false
    }

    state={
        current:browserHistory.getCurrentLocation().pathname
    }

    handleClick(e) {
        this.hasClick = true
        this.setState({
            ...this.state,
            current: e.key
        })
    }
    convertDetailPage() {
        let location = browserHistory.getCurrentLocation()
        let match = location.pathname.match(reg)
        return match && match[3] ? '/' + match[2] : location.pathname
    }
    _renderSubs(menus) {
        return menus.map(function(item) {
            return (
                <SubMenu key={item.key} name={item.name} title={item.title}>
                    {
                        item.items.map(function(item2) {
                            return <Menu.Item key={item2.router} name={item2.name}><Link to={item2.router}>{item2.name}</Link></Menu.Item>
                        })
                    }
                </SubMenu>
            )
        })
    }
    render() {
        this.hasClick = false
        let { menus } = this.props
        let current = this.hasClick ? this.state.current : this.convertDetailPage()
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} theme={menus.theme}
              defaultOpenKeys={menus.defaultOpenKeys} mode="inline" >
                {this._renderSubs(menus.subs)}
            </Menu>
        )
    }
}
