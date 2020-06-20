import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "axios"
import '../../App.css'
import NavBarLogin from "../navbar-login/NavBarLogin";

const { Content } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
    constructor(props){
        super(props);
        let loggedIn  = true;
        let isAdmin = true;
        const email = localStorage.getItem("email")
        const adminToken = localStorage.getItem("isAdmin")
        if(email == null){
            loggedIn = false
        }
        if(adminToken == null ){
            isAdmin = false
        }
        this.state = {
            email: "",
            password: "",
            loggedIn,
            isAdmin,
            clickedRegister: false
        }
        console.log(this.state)
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
        axios.post('https://battle-ship-back-end-2020.herokuapp.com/auth/login',data)
            .then((res) => {
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'You are logged in!',
                    duration: 2
                });
                localStorage.setItem("email",data.email);
                if(res.data.userName.email === "dinhson2905@gmail.com"){
                    localStorage.setItem('isAdmin',"true");
                    this.setState({
                        isAdmin : true
                    })
                }
                this.setState({
                    loggedIn : true
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
        if(this.state.loggedIn){
            if(!this.state.isAdmin){
                return <Redirect to="/" />
            }
            else{
                return <Redirect to={{ pathname: '/admin/user-list' }} />
            }
        }
        if(this.state.clickedRegister){
            return <Redirect to={{ pathname: '/register' }} />
        }

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
