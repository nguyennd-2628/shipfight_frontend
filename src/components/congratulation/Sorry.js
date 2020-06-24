import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Modal } from 'antd'

class Sorry extends Component {
  state = {
    visible: false,
    comeHomePage: false
  };

  handleOk = e => {
    this.setState({
      comeHomePage: true
    })
  };

  render() {
    this.state.visible = this.props.visible
    if (this.state.comeHomePage) return <Redirect to='/' />
    return (
      <div>
        <Modal
          title="Sorry"
          visible={this.props.visible}
          onOk={this.handleOk}
          cancelButtonProps={{ disabled: true }}
        >
          So Close ...
          You Lose :(
        </Modal>

      </div>
    );
  }
}

export default Sorry;
