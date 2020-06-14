import React, { Component } from 'react';
import {Form, Input, Button, Checkbox, Layout, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "axios"
import NavBar from "../navbar/NavBar";
import '../../App.css'
import NavBarLogin from "../navbar-login/NavBarLogin";

const { Header, Content, Footer } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
    state ={
        email : "",
        password : "",
        loggedIn : false,
        loggedInAdmin: false,
        clickedRegister: false
    };
    onChangePassword = (e)=>{
        this.setState({
            password : e.target.value
        })
    };
    onChangeEmail = (e)=>{
        this.setState({
            email : e.target.value
        })
    };

    onClickRegister = (e) => {
        this.setState({
            clickedRegister: true
        })
    };

    onCommit = (e)=>{
        var data ={
            email : this.state.email,
            password : this.state.password
        };
        axios.post('https://battle-ship-back-end-2020.herokuapp.com/auth/login',data)
        .then((res)=>{
            notification.open({
                type: 'success',
                message: 'Success',
                description: 'You are logged in!',
                duration: 2
            });
            if (data && data.email === 'nghia120@gmail.com') {
                this.setState({
                    loggedInAdmin: true
                });
            } else {
                this.setState({
                    loggedIn: true
                });
            }
        })
        .catch((err)=>{
            notification.open({
                type: 'error',
                message: 'Incorrect username or password.',
                description: 'Please try again',
                duration: 2
            });
        })
    };
    render() {
        return (
            <Layout className="layout">
                {/*<NavBar />*/}
                <NavBarLogin />
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
                            <Input onChange = {this.onChangeEmail}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password  onChange = {this.onChangePassword}/>
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.onCommit}>
                                Login
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={this.onClickRegister}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Content>
                {
                    this.state.loggedInAdmin ? <Redirect to={{ pathname: '/admin/user-list'}} /> : null
                }
                {
                    this.state.loggedIn ? <Redirect to={{ pathname: '/'}} /> : null
                }
                {
                    this.state.clickedRegister ? <Redirect to={{ pathname: '/register'}} /> : null
                }
            </Layout>
        );
    }
}

export default Login;
