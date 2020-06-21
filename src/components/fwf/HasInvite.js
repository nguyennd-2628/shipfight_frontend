import React, { Component } from 'react';
import { Modal, notification } from 'antd';
import { Redirect } from 'react-router-dom';


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
            matchingSuccess: false,
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
        props.socket.on('s2c_phan_hoi',(data)=>{
            if(data.success === 1){
                this.setState({
                    matchingSuccess: true
                })
            }
            else{
                notification.open({
                    type: 'error',
                    message: 'Invite is canceled',
                    description: 'Invite is canceled',
                    duration: 2
                });
                this.setState({
                    visible : false
                })
            }
        })
    }
    handleOk = e => {
        this.props.socket.emit("c2s_phan_hoi", { result: true, socketId: this.state.host_socketId })
        this.setState({
            visible: false,
        });

    };

    handleCancel = e => {
        this.props.socket.emit("c2s_phan_hoi", { result: false, socketId: this.state.host_socketId })
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        if(this.state.matchingSuccess) return <Redirect to="/game-play" />
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
            </div>
        );
    }
}

export default HasInvite;