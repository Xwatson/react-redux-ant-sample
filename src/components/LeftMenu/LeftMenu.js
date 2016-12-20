/**
 * Created by xwatson on 2016/12/9.
 */
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu

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
    hasDetailPage() {
        let location = browserHistory.getCurrentLocation()
        let reg = /^(\/)(items)(\/)?/
        let match = location.pathname.match(reg)
        if (match && match[3]) {
            return '/' + match[2]
        } else {
            return location.pathname
        }
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
        let current = this.state.current
        if (this.hasClick) {
            current = this.state.current
        } else {
            current = this.hasDetailPage()
        }
        console.log(current)
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} theme={menus.theme}
              defaultOpenKeys={menus.defaultOpenKeys} mode="inline" >
                {this._renderSubs(menus.subs)}
            </Menu>
        )
    }
}
