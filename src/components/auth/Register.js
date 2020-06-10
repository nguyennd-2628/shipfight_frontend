import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Icon, Form, Input, InputNumber } from 'antd';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }
  onFinish = values => {
    console.log(values);
  };
  Register = () => {
    const { pass, repass } = this.state
    if (pass == repass) {
      console.log('OKKK Pass')
    } else console.log('Err Pass')
  }
  toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const { pass, repass } = this.state
    return (
      <div>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={pass}
              onChange={(element) => this.setState({ pass: element.currentTarget.value })}
            />
          </Form.Item>
          <Form.Item
            label="Xác nh?n Password"
            name="Xác nh?n password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={repass}
              onChange={(element) => this.setState({ repass: element.currentTarget.value })}
            />
          </Form.Item>
          <Form.Item
            label="Url Image"
            name="Url Image"
            rules={[{ required: true, message: 'Please input your Url Image!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit"
              onClick={this.Register}
            >
              Submit
        </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default Register