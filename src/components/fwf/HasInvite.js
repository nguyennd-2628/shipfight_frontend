import React, { Component } from 'react';
import { Modal } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

class HasInvite extends Component {
    constructor(props) {
        super(props);

        const userToken = localStorage.getItem("user") || null            // get default user infor
        const loggedIn = (userToken === null) ? false : true
        const user = (loggedIn) ? JSON.parse(userToken) : null
        let isAdmin = true
        if (user === null) isAdmin = false
        else if (user.role === 'user') isAdmin = false
        this.state = {
            user,
            loggedIn,
            isAdmin,
            visible: false,
            visibleMatching: false,
            host: null,
            host_socketId: ''
        }
        props.socket.on('s2c_loi_moi', data => {
            this.setState({
                visible: true,
                host: data.host,
                host_socketId: data.host_socketId
            })

        })
        props.socket.on('s2c_chap_nhan', (data) => {
            if (data.success === 1) this.setState({ visibleMatching: true });
            else alert('Matching failed');
        })

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
                    {(this.state.host===null)?'':this.state.host.name} - {(this.state.host===null)?'':this.state.host.ranking_point} sends his challenge to you
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