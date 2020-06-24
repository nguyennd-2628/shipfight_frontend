import React, { Component } from 'react';
import { Modal, ImageInModal } from 'antd'
import { Redirect } from 'react-router-dom'

class Congratulations extends Component {
  state = {
    visible: false,
    comeHomePage: false
  }

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
          title="Congratulations"
          visible={this.state.visible}
          onOk={this.handleOk}
          cancelButtonProps={{ disabled: true }}
        >
          Congratulations .... 
        </Modal>

      </div>
    );
  }
}

export default Congratulations;