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
        super(props)
        this.state = {
            email: "",
            password: "",
            repassword: "",
            name: "",
            avartar_url: "",
            updateSuccess: false
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };

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
        if(this.state.password !== this.state.repassword) {
            notification.open({
                type: 'error',
                message: 'Error',
                description: 'Confirm password incorrect',
                duration: 2
            });
        }
        else if (this.state.password !== '' && this.state.repassword !== '') {
            var data;
            if(this.state.avartar_url === ''){
                data = {
                    email : this.state.email,
                    password : this.state.password,
                    name : this.state.name,
                }
            }
            else{
                data = {
                    email : this.state.email,
                    password : this.state.password,
                    name : this.state.name,
                    avartar_url : this.state.avartar_url
                }
            }
            axios.put("https://battle-ship-back-end-2020.herokuapp.com/users",data)
                .then((res)=>{
                    // console.log(res);
                    // console.log("Register Suceess !!!");
                    notification.open({
                        type: 'success',
                        message: 'Success',
                        description: 'Update Data Success',
                        duration: 2
                    });
                    this.setState({
                        registerSuccess: true
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
                                initialValue={'trihieua2@gmail.com'}
                            >
                                <Input onChange={this.onChangeEmail} disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    //   value={pass}
                                    onChange={this.onChangePassword}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="Confirm password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    //   value={repass}
                                    onChange={this.onChangeRePassword}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Nick name"
                                name="Name"
                                rules={[{ required: true, message: 'Please input your nick name!' }]}
                                initialValue={'Tri Hieu'}
                            >
                                <Input onChange={this.onChangeNickName} />
                            </Form.Item>

                            <Form.Item
                                label="Url Image"
                                name="Url Image"
                                initialValue={'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png'}
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
                    this.state.updateSuccess ? <Redirect to={{ pathname: '/'}} /> : null
                }
            </Layout>
        );
    }
}

export default ProfileEdit;
