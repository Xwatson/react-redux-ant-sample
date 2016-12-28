/**
 * Created by xwatson on 2016/12/28.
 */
import '../../../styles/LoginForm.scss'
import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { injectIntl, defineMessages } from 'react-intl'
const FormItem = Form.Item

const messages = defineMessages({
    UserNamePlaceholder: {
        id: 'Login.Input.UserName.Placeholder',
        defaultMessage: 'username'
    },
    PasswordPlaceholder: {
        id: 'Login.Input.Password.Placeholder',
        defaultMessage: 'password'
    },
    UserNameRequired: {
        id: 'Login.Input.Required.UserName',
        defaultMessage: 'Please input your username!'
    },
    PasswordRequired: {
        id: 'Login.Input.Required.Password',
        defaultMessage: 'Please input your Password!'
    },
    BtnLogin: {
        id: 'Login.Btn.Login',
        defaultMessage: 'Log in'
    },
    RememberMe: {
        id: 'Login.Link.RememberMe',
        defaultMessage: 'Remember me'
    },
    ForgotPwd: {
        id: 'Login.Link.ForgotPwd',
        defaultMessage: 'Forgot password'
    },
    Register: {
        id: 'Login.Link.Register',
        defaultMessage: 'register now!'
    }
})
const Login = Form.create()(React.createClass({
    propTypes: {
        intl: React.PropTypes.object,
        form: React.PropTypes.any,
        singIn: React.PropTypes.func,
        User: React.PropTypes.object
    },
    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.singIn(values)
            }
        })
    },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    },
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="login-container">
                <div className="login-window">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: this.props.intl.formatMessage(messages.UserNameRequired) }]
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder={this.props.intl.formatMessage(messages.UserNamePlaceholder)} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: this.props.intl.formatMessage(messages.PasswordRequired) }]
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder={this.props.intl.formatMessage(messages.PasswordPlaceholder)} />
                            )}
                        </FormItem>
                        <FormItem style={{ marginBottom:0 }}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>{this.props.intl.formatMessage(messages.RememberMe)}</Checkbox>
                            )}
                            <a className="login-form-forgot">{this.props.intl.formatMessage(messages.ForgotPwd)}</a>
                            <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                {this.props.intl.formatMessage(messages.BtnLogin)}
                            </Button>
                            Or <a>{this.props.intl.formatMessage(messages.Register)}</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}))

export default injectIntl(Login, {
    withRef: true,
})
