import React, { Component } from 'react';
import { Modal } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

class HasInvite extends Component {
    constructor(props) {
        super(props);

        props.socket.on('s2c_loi_moi', data => {
            this.setState({
                visible: true,
                host_email: data.host_email,
                host_socketId: data.host_socketId
            })

        })
        props.socket.on('s2c_chap_nhan', (data) => {
            if (data.success === 1) this.setState({ visibleMatching: true });
            else alert('Matching failed');
        })

    }
    state = {
        visible: false,
        visibleMatching: false,
        host_email: '',
        host_socketId: ''
    }
    handleOk = e => {
        this.props.socket.emit("c2s_phan_hoi", { result: true, socketId: this.state.host_socketId })
        this.setState({
            visible: false,
            visibleMatching: true
        });

    };

    handleCancel = e => {
        this.props.socket.emit("c2s_phan_hoi", { result: false, socketId: this.state.host_socketId })
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancelMatching = e => {
        this.setState({ visibleMatching: false })
    }

    render() {
        return (
            <div>
                <Modal
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.host_email} sends his challenge to you
                </Modal>
                <Modal
                    title="Matching"
                    visible={this.state.visibleMatching}
                    onCancel={this.handleCancelMatching}
                >
                    <SyncOutlined spin />
                </Modal>
            </div>
        );
    }
}

export default HasInvite;