import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from "axios"


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
        password : ""   
    }
    onChangePassword = (e)=>{
        this.setState({
            password : e.target.value
        })
    }
    onChangeEmail = (e)=>{
        this.setState({
            email : e.target.value
        })
    }
    onCommit = (e)=>{
        var data ={
            email : this.state.email,
            password : this.state.password
        }
        console.log(data)
        axios.post('https://battle-ship-back-end-2020.herokuapp.com/auth/login',data)
        .then((res)=>{
            console.log("response: ", res)
            alert("login success !!!")
        })
        .catch((err)=>{
            console.log("ERROR :" ,err)
        })
    }
    render() {
        return (
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Login;