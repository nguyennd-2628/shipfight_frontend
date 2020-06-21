import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Modal} from 'antd'
import { SyncOutlined } from '@ant-design/icons';

class AutoMatching extends Component {
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
            matchingSuccess : false
        }
        props.socket.on('s2c_auto_matching', data => {
            if(data.success === 1){
                this.setState({
                    matchingSuccess : true
                })
            }
        })
        props.socket.on('s2c_cancel_auto_matching', data=>{
            console.log(data)
            if(data.success === 1){
                this.setState({
                    visible: false,
                });
            }
        })
    }
    showModal = () => {
        this.props.socket.emit('c2s_auto_matching');
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.props.socket.emit('c2s_cancel_auto_matching')
    };
    render() {
        if(this.state.matchingSuccess) return <Redirect to='/game-play'/>
        
        return (
            <div>
                <Button type="primary" onClick={this.showModal} block>
                    Fight
                </Button>
                <Modal
                    title="Online User"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okButtonProps={{ disabled: true }}
                >
                    Waiting  
                    <SyncOutlined spin />
                </Modal>
            </div>
        );
    }
}

export default AutoMatching;