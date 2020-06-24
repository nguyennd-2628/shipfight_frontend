import React, { Component } from 'react';
import { Modal, Button, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons';

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
            waitingVisible: false,
            matchingSuccess: false,
            usersOnline: [],
            enemySocketId: null,
            enemyInfor: null,
            turn: true
        }
        props.socket.on('s2c_online_list', data => {
            this.setState({ usersOnline: data })
        })
        props.socket.on('s2c_thach_dau', data => {
            if (data.success === 0){
                notification.open({
                    type: 'error',
                    message: 'Nguoi choi dang ban',
                    description: 'Nguoi choi dang ban',
                    duration: 2
                });
                this.setState({
                    visible: true,
                    waitingVisible: false
                })
            }
        })
        props.socket.on('s2c_chap_nhan', (data) => {
            if (data.success === 1) {
                this.setState({
                    matchingSuccess: true
                });
            }
            else {
                notification.open({
                    type: 'error',
                    message: 'Nguoi choi dang ban',
                    description: 'Nguoi choi dang ban',
                    duration: 2
                });
                this.setState({
                    waitingVisible: false,
                    visible: true
                })
            }
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

    handleWaitingCancel = e => {
        this.props.socket.emit('c2s_cancel_thach_dau')
        this.setState = {
            visible: true,
            waitingVisible: false
        }
    }

    handleInvite = (e) => {
        var socketId = e.currentTarget.value;
        this.props.socket.emit('c2s_thach_dau', socketId);
        var enemyInfor;
        this.state.usersOnline.forEach((user) => {
            if (user.socketId === socketId) {
                enemyInfor = user.infor
            }
        })

        this.setState({
            enemyInfor,
            enemySocketId: socketId,
            visible: false,
            waitingVisible: true
        });
    }

    renderUsersOnline = () => {
        const users = this.state.usersOnline.filter(user => {
            if (user.infor.email !== this.state.user.email && user.status === 1) return user;
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
        if (this.state.matchingSuccess)
            return <Redirect to={{
                pathname: '/game-play',
                state: {
                    enemySocketId: this.state.enemySocketId,
                    enemyInfor: this.state.enemyInfor,
                    turn: this.state.turn
                }
            }} />
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
                <Modal
                    title="Online User"
                    visible={this.state.waitingVisible}
                    onCancel={this.handleWaitingCancel}
                >
                    Waiting Player confirm
                    <SyncOutlined spin />
                </Modal>
            </div>
        );
    }
}

export default UserOnlineList;
