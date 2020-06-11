import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Button, Form, Input, Layout, notification} from 'antd';
import axios from 'axios';
import NavBar from "../navbar/NavBar";
import { Redirect } from "react-router-dom";
import NavBarLogin from "../navbar-login/NavBarLogin";

const { Header, Content, Footer } = Layout;

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      repassword: "",
      name: "",
      avartar_url: "",
      registerSuccess: false,
      clickedCancel: false
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

  onCancel = () => {
    this.setState({
      clickedCancel: true
    })
  };
  onSubmit = (e) => {
    if(this.state.password != this.state.repassword){
      notification.open({
        type: 'error',
        message: 'Error',
        description: 'Confirm password incorrect',
        duration: 2
      });    }
    else{
      var data;
      if(this.state.avartar_url == ''){
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
      axios.post("https://battle-ship-back-end-2020.herokuapp.com/users",data)
      .then((res)=>{
        notification.open({
          type: 'success',
          message: 'Create account success',
          description: 'Please log in!',
          duration: 2
        });
        this.setState({
          registerSuccess: true
        })
      })
      .catch((err)=>{
        console.log(err);
        notification.open({
          type: 'error',
          message: 'Error',
          description: 'Please try again!',
          duration: 2
        });
      })

    }
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
        <Layout className="layout">
          {/*<NavBar />*/}
          <NavBarLogin />
          <Content className='main'>
            <div className="site-layout-content">
            <Form {...layout} name="nest-messages" >
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input onChange={this.onChangeEmail} />
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
          >
            <Input onChange={this.onChangeNickName} />
          </Form.Item>

          <Form.Item
            label="Url Image"
            name="Url Image"
          >
            <Input onChange={this.onChangeAvartar} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
              Submit
            </Button >
            <Button type="primary" htmlType="submit" onClick={this.onCancel}>
              Cancel
            </Button >
          </Form.Item>
        </Form>
            </div>
          </Content>
          {
            this.state.registerSuccess || this.state.clickedCancel ? <Redirect to={{ pathname: '/login'}} /> : null
          }
        </Layout>
    )
  }
}
export default Register
