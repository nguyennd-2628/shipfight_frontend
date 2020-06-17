import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


class Help extends Component {
    state = { visible: false };
    showModal = () => {
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

    render() {
        return (
            <div>
                <Button type="primary" block onClick={this.showModal}>
                    Help
                </Button>
                <Modal
                    title={<div><ExclamationCircleOutlined /><span>    Game Guide</span></div>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/*<li>1. Click a square to shoot</li>*/}
                    {/*<li>2. If hit it will destroy</li>*/}
                    {/*<li>3. How old are you?</li>*/}
                    {/*<li>4. Im fine, Thanks and you!</li>*/}
                    <li>ゲームは２段階があります</li>
                    <li>フェース１：自分のシップを置く</li>
                    <li>フェース２：ターンで、ロケットを発射する</li>
                    <li>敵のシップは見えない</li>
                    <li>敵のシップを全部倒すと、勝利</li>
                    <li>自分のシップが全部やられたと、敗北</li>
                </Modal>
            </div>
        );
    }
}

export default Help;
