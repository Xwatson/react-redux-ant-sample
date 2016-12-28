/**
 * Created by xwatson on 2016/12/28.
 */
import '../../../styles/LoginForm.scss'
import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
// import { FormattedMessage } from 'react-intl'
const FormItem = Form.Item

const Login = Form.create()(React.createClass({
    propTypes: {
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
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem style={{ marginBottom:0 }}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot">Forgot password</a>
                            <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a>register now!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}))

export default Login
