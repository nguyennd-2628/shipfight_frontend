import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "axios"
import '../../App.css'
import NavBar from "../navbar/NavBar";

const { Content } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
    constructor(props) {
        super(props);
        let loggedIn  = true
        let isAdmin = true
        let user = null

        const userToken = localStorage.getItem("user") || null
        if(userToken == null){
            loggedIn = false
        }
        else{
            user = JSON.parse(userToken)
            if(user.role !== "admin" ) isAdmin = false
        }
        this.state = {
            loggedIn,
            isAdmin,
            email : "",
            password: "",
            clickedRegister: false
        }
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };
    onClickRegister = (e) => {
        this.setState({
            clickedRegister: true
        })
    };
    onCommit = (e) => {
        var data = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('https://battle-ship-back-end-2020.herokuapp.com/auth/login', data)
            .then((res) => {
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'You are logged in!',
                    duration: 2
                });
                localStorage.setItem("user", JSON.stringify(res.data.userName));
                this.setState({
                    loggedIn: true
                })
            })
            .catch((err) => {
                notification.open({
                    type: 'error',
                    message: 'Incorrect username or password.',
                    description: 'Please try again',
                    duration: 2
                });
            })
    };
    render() {
        if (this.state.loggedIn) {
            if (!this.state.isAdmin) {
                return <Redirect to="/" />
            }
            else {
                return <Redirect to={{ pathname: '/admin/user-list' }} />
            }
        }
        if (this.state.clickedRegister) {
            return <Redirect to={{ pathname: '/register' }} />
        }

        return (
            <Layout className="layout">
                <NavBar />
                <Content className='main'>
                    <div className="site-layout-content">
                        <Form
                            {...layout}
                            name="basic"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input onChange={this.onChangeEmail} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={this.onChangePassword} />
                            </Form.Item>

                            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.onCommit}>
                                    Submit
                            </Button>
                                <Button type="primary" htmlType="submit" onClick={this.onClickRegister}>
                                    Register
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>

            </Layout>
        );
    }
}

export default Login;
