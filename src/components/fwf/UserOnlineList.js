import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class UserOnlineList extends Component {
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
            usersOnline: []
        }
        props.socket.on('s2c_online_list', data => {
            this.setState({ usersOnline: data })
        })
        props.socket.on('s2c_thach_dau', data => {
            if (data.success === 0) alert('failed to send an invitation to challenge');
            else alert('Sent an invitation to challenge');
        })
    }

    showModal = () => {
        this.props.socket.emit('c2s_online_list');
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleInvite = (e) => {
        var socketId = e.currentTarget.value;
        this.props.socket.emit('c2s_thach_dau', socketId);
        this.setState({ visible: false });
    }

    renderUsersOnline = () => {
         const users = this.state.usersOnline.filter(user => {
            if (user.infor.email !== this.state.user.email) return user;
            else return null;
        })
        return (
            <div>
                {users.map(user => (
                    <li>{user.infor.name} - {user.infor.ranking_point} <Button value={user.socketId} onClick={this.handleInvite}>Invite</Button></li>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} block>
                    Fight with friends
                </Button>
                <Modal
                    title="Online User"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderUsersOnline()}
                </Modal>
            </div>
        );
    }
}

export default UserOnlineList;
