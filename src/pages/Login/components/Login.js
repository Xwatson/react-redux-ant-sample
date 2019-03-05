import React from 'react'
import { Link } from 'react-router-dom'
import Login from 'ant-design-pro/lib/Login'
import { Alert, Checkbox } from 'antd'

const {
  Tab,
  UserName,
  Password,
  Mobile,
  Captcha,
  Submit,
} = Login

export default class LoginPage extends React.PureComponent {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true,
  }

  onSubmit = (err, values) => {
    const { type } = this.state
    // console.log('value collected ->', { ...values, autoLogin })
    if (type === 'tab1') {
      this.setState({
        notice: '',
      }, () => {
        if (!err && (values.username !== 'admin' || values.password !== '888888')) {
          setTimeout(() => {
            this.setState({
              notice: 'The combination of username and password is incorrect!',
            })
          }, 500)
        }
      })
    }
  }

  onTabChange = (key) => {
    this.setState({
      type: key,
    })
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }

  render() {
    const { autoLogin, type, notice } = this.state
    return (
      <Login
        defaultActiveKey={type}
        onTabChange={this.onTabChange}
        onSubmit={this.onSubmit}
      >
        <Tab key="tab1" tab="Account">
          {
            notice
            && <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />
          }
          <UserName name="username" />
          <Password name="password" />
        </Tab>
        <Tab key="tab2" tab="Mobile">
          <Mobile name="mobile" />
          <Captcha name="captcha" />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>记住我</Checkbox>
          <Link style={{ float: 'right' }} to="/">忘记密码</Link>
        </div>
        <Submit>Login</Submit>
      </Login>
    )
  }
}
