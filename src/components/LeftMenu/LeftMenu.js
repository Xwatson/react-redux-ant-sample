/**
 * Created by xwatson on 2016/12/9.
 */
import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu

export default class LeftMenu extends React.Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    state={
        current:browserHistory.getCurrentLocation().pathname
    }

    handleClick (e) {
        this.setState({
            current: e.key
        })
    }

    render () {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} theme="dark"
              defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                    <Menu.Item key="/"><IndexLink to="/">Home</IndexLink></Menu.Item>
                    <Menu.Item key="/items"><Link to="/items">Items</Link></Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6" > Option6 </Menu.Item >
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu >
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu >
        )
    }
}