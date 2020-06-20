import React, { Component } from 'react';
import { Layout, Form, Input, Button, notification} from 'antd';
import axios from 'axios';
import '../../App.css';
import NavBar from "../../components/navbar/NavBar";
import './Profile.css'
import {Link, Redirect} from "react-router-dom";

const { Content } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        const userToken = localStorage.getItem("user") || null            // get default user infor
        const loggedIn  = (userToken === null) ? false : true 
        const user = (loggedIn) ? JSON.parse(userToken) : null
        let isAdmin = true
        if( user === null) isAdmin = false
        else if( user.role === 'user' ) isAdmin = false
        this.state = {
            user,
            password: "",
            repassword: "",
            name: "",
            avartar_url: "",
            updateSuccess: false,
            loggedIn,
            isAdmin
        }
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    onChangeRePassword = (e) => {
        this.setState({
            repassword: e.target.value
        })
    };
    onChangeNickName = (e) => {
        this.setState({
            name: e.target.value
        })
    };
    onChangeAvartar = (e) => {
        this.setState({
            avartar_url: e.target.value
        })
    };
    onSubmit = (e) => {
        let password = (this.state.password === this.state.user.password) ? '' : this.state.password
        let repassword = this.state.repassword
        let avartar_url = this.state.avartar_url
        let name = this.state.name
        console.log(password,repassword)
        if(password !== repassword ) {
            notification.open({
                type: 'error',
                message: 'Error',
                description: 'Confirm password incorrect',
                duration: 2
            });
        }
        else{
            password = (password === '') ? this.state.user.password : password
            name = (name === '') ? this.state.user.name : name    
            avartar_url = (avartar_url === '') ? this.state.user.avartar_url : avartar_url
            const data = {
                password,
                name,
                avartar_url
            }
            axios.put("https://battle-ship-back-end-2020.herokuapp.com/users/"+this.state.user.id,data)
            .then((res)=>{
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'Update Data Success',
                    duration: 2
                });
                let userNewInfor = this.state.user
                userNewInfor.password = password
                userNewInfor.name = name
                userNewInfor.avartar_url = avartar_url
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(userNewInfor))
                this.setState({
                    user : userNewInfor,
                    updateSuccess: true
                })
            })
            .catch((err)=>{
                notification.open({
                    type: 'error',
                    message: 'Incorrect Data',
                    description: 'Please try again!',
                    duration: 2
                });
            })
        }  
    };
    render() {
        return (
            <Layout className="layout">
                <NavBar />
                <Content className='main'>
                    <div className="site-layout-content">
                        <Form {...layout} name="nest-messages" >
                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                                initialValue={this.state.user.email}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[]}
                            >
                                <Input.Password
                                    onChange={this.onChangePassword}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="Confirm password"
                                rules={[]}
                            >
                                <Input.Password
                                    onChange={this.onChangeRePassword}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Nick name"
                                name="Name"
                                rules={[{ required: true, message: 'Please input your nick name!' }]}
                                initialValue={this.state.user.name}
                            >
                                <Input onChange={this.onChangeNickName} />
                            </Form.Item>

                            <Form.Item
                                label="Url Image"
                                name="Url Image"
                                initialValue={this.state.user.avartar_url}
                            >
                                <Input onChange={this.onChangeAvartar} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                                    Submit
                                </Button >
                                <Button type="primary">
                                    <Link exact to="/profile">
                                        Cancel
                                    </Link>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                {
                    this.state.updateSuccess ? <Redirect to={{ pathname: '/profile'}} /> : null
                }
            </Layout>
        );
    }
}

export default ProfileEdit;
