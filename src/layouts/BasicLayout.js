import '../styles/layout.less'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
} from 'antd'
import AuthorizedRoute from '../components/AuthorizedRoute'
import router from '../common/router'
import NoPermission from '../pages/403'
import NoPageFound from '../pages/404'
import ServiceError from '../pages/500'

const { Header, Sider, Content } = Layout

export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    })
  }

  render() {
    const { collapsed } = this.state
    return (
      <Layout className="basic-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="layout-header">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="menu-right">
              <p>
                <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="small">
                  X
                </Avatar>
              </p>
              <p>
                <Icon className="lang" type="global" />
              </p>
            </div>
          </Header>
          <Content className="layout-content">
            <Switch>
              {
                router['/'].map(route => (
                  <AuthorizedRoute
                    key={route.path}
                    authority="admin"
                    path={route.path}
                    redirectPath={route.component ? '/403' : route.redirect}
                    component={route.component}
                  />
                ))
              }
              <Route exact path="/403" component={NoPermission} />
              <Route exact path="/404" component={NoPageFound} />
              <Route exact path="/500" component={ServiceError} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
