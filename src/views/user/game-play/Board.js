import React, { Component } from 'react';
import {Button, Layout, Row, message, Col, Avatar} from "antd";
import Congratulation from '../../../components/congratulation/Congratulations'
import Sorry from '../../../components/congratulation/Sorry'

import './Board.css'
import {
    FIELD_HEIGHT,
    FIELD_WIDTH,
    MAX_PLANE,
    PLANE_ONE_ALIVE,
    PLANE_TWO_ALIVE,
    PLANE_TWO_DEAD,
    PLANE_TWO_EXPOSED,
    PLANE_ONE_DEAD,
    PLANE_ONE_EXPOSED,
    PLANE_ONE_MISSED,
    PLANE_TWO_MISSED
} from "../../common/Constant";
import NavBar from "../../../components/navbar/NavBar";
import {Link, Redirect} from "react-router-dom";

const { Content } = Layout;

function Square(props) {
    switch (props.value) {
        case null:
            return (
                <Button className="water-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_ONE_ALIVE:
            return (
                <Button className="player1-alive-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_ONE_EXPOSED:
            return (
                <Button className="player1-exposed-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_ONE_DEAD:
            return (
                <Button className="player1-dead-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_ONE_MISSED:
            return (
                <Button className="missed-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_TWO_ALIVE:
            return (
                <Button className="player2-alive-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_TWO_EXPOSED:
            return (
                <Button className="player2-exposed-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_TWO_DEAD:
            return (
                <Button className="player2-dead-square" onClick={props.onClick}>
                </Button>
            );
            break;
        case PLANE_TWO_MISSED:
            return (
                <Button className="missed-square" onClick={props.onClick}>
                </Button>
            );
            break;
        default:
            return (
                <Button className="water-square" onClick={props.onClick}>
                </Button>
            );
            break;
    }
}

class Board extends Component {
    constructor(props) {
        super(props);
        const userToken = localStorage.getItem("user") || null;            // get default user infor
        const loggedIn  = (userToken === null) ? false : true;
        const user = (loggedIn) ? JSON.parse(userToken) : null;
        let isAdmin = true;
        if( user === null) isAdmin = false;
        else if( user.role === 'user' ) isAdmin = false;
        let enemySocketId = null;
        let enemyInfor = null;
        let playerOneIsNext = true;
        if(props.location.state){
            enemySocketId = props.location.state.enemySocketId
            enemyInfor = props.location.state.enemyInfor
            if(!props.location.state.turn){
                playerOneIsNext = false
            }
        }
        this.state = {
            user,
            loggedIn,
            isAdmin,
            enemySocketId,
            enemyInfor,
            squares: Array(FIELD_WIDTH * FIELD_HEIGHT).fill(null),
            playerOneIsNext,
            setPlaneTurnLeft: MAX_PLANE * 2,
            announce: '',
            congratulationFrame: false,
            sorryFrame: false
        }
        props.socket.on('s2c_play_game',(data)=>{
            if( data.success === 0 ){
                alert(data.message)
            }
        })
        props.socket.on('s2c_game_command',(data) => {
            this.handlePlayerTwoTurn(data)
        })
    }

    componentWillUnmount(){
        this.props.socket.emit("c2s_end_game")
    }

    calculateWinner = () => {
        const {squares, setPlaneTurnLeft} = this.state;

        if (setPlaneTurnLeft > 0) return null;

        let playerOneDeadPlaneCount = 0;
        let playerTwoDeadPlaneCount = 0;

        for (let i = 0; i < FIELD_WIDTH * FIELD_HEIGHT - 1; i++) {
            if (squares[i] === PLANE_ONE_DEAD) {
                playerOneDeadPlaneCount += 1;
            }
            if (squares[i] === PLANE_TWO_DEAD) {
                playerTwoDeadPlaneCount += 1;
            }
        }

        if (playerOneDeadPlaneCount >= MAX_PLANE) return{
                                                            message: 'Congratulations '+ this.state.enemyInfor.name + ' Win',
                                                            youWin : false
                                                        };
        if (playerTwoDeadPlaneCount >= MAX_PLANE) return{
                                                            message: 'Congratulations '+ this.state.user.name +' Win',
                                                            youWin : true
                                                        }
        return null;
    };

    handleClick(i) {
        const {playerOneIsNext, setPlaneTurnLeft} = this.state;
        const squares = this.state.squares.slice();
        let announceMessage = '';
        // neu co nguoi thang => game over
        if (this.calculateWinner()) {
            return;
        }
        if (!playerOneIsNext) {
            return;
        }

        /* player 1's turn */
        if (playerOneIsNext) {
            // set plane in empty square
            if (setPlaneTurnLeft > 0) {
                if (squares[i] === null) {
                    squares[i] = PLANE_ONE_ALIVE;
                    announceMessage = `Placed ship success`;
                }
                else if (squares[i] === PLANE_TWO_ALIVE){
                    squares[i] = PLANE_TWO_EXPOSED;
                    this.setState({
                        squares: squares,
                        announce: `Detected ${this.state.enemyInfor.name} ship.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_TWO_EXPOSED){
                    this.setState({
                        announce: `You already detected that ship.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_ONE_ALIVE || squares[i] === PLANE_ONE_EXPOSED){
                    announceMessage = 'This position has already been placed ship.\nPlease choose another position!';
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
            }
            // shooting phase player 1
            else {
                if (squares[i] === PLANE_TWO_ALIVE || squares[i] === PLANE_TWO_EXPOSED){
                    squares[i] = PLANE_TWO_DEAD;
                    announceMessage = `Shot HIT!!\nOne of ${this.state.enemyInfor.name}'s ships has been terminated`;
                }
                else if (squares[i] === PLANE_ONE_ALIVE || squares[i] === PLANE_ONE_EXPOSED){
                    announceMessage = `Can't shoot allies ship.\nPlease choose another position!`;
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
                else if (squares[i] === null){
                    squares[i] = PLANE_ONE_MISSED;
                    announceMessage = `You missed!`;
                }
                else {
                    announceMessage = `That position has already been shot.\nPlease choose another position!`;
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
            }
        }

        let dataToSend = {
            enemySocketId : this.state.enemySocketId,
            playCommand : i
        }
        this.props.socket.emit("c2s_play_game",dataToSend)

        this.setState({
            squares: squares,
            playerOneIsNext: !this.state.playerOneIsNext,
            setPlaneTurnLeft: setPlaneTurnLeft - 1,
            announce: announceMessage
        });
    }

    handlePlayerTwoTurn(i) {
        const {playerOneIsNext, setPlaneTurnLeft} = this.state;
        const squares = this.state.squares.slice();
        let announceMessage = '';
        // neu co nguoi thang => game over
        if (this.calculateWinner()) {
            return;
        }
        if (playerOneIsNext) {
            return;
        }

        /* player 2's turn */
        if (!playerOneIsNext) {
            if (setPlaneTurnLeft > 0) {
                if (squares[i] === null) {
                    squares[i] = PLANE_TWO_ALIVE;
                    announceMessage = `Player ${this.state.enemyInfor.name} placed a ship`;
                }
                else if (squares[i] === PLANE_ONE_ALIVE){
                    squares[i] = PLANE_ONE_EXPOSED;
                    this.setState({
                        squares: squares,
                        announce: `One of your ship has been detected`
                    });
                    return;
                }
                else if (squares[i] === PLANE_ONE_EXPOSED){
                    this.setState({
                        announce: ``
                    });
                    return;
                }
                else if (squares[i] === PLANE_TWO_ALIVE || squares[i] === PLANE_TWO_EXPOSED){
                    announceMessage = '';
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
            }
            //shooting phase player2
            else {
                if (squares[i] === PLANE_ONE_ALIVE || squares[i] === PLANE_ONE_EXPOSED){
                    squares[i] = PLANE_ONE_DEAD;
                    announceMessage = `Shot HIT!!\nOne of your ship has been terminated`;
                }
                // else if (squares[i] === PLANE_TWO_ALIVE || squares[i] === PLANE_TWO_EXPOSED){
                //     announceMessage = ``;
                //     this.setState({
                //         announce: announceMessage
                //     });
                //     return;
                // }
                else if (squares[i] === null){
                    squares[i] = PLANE_TWO_MISSED;
                    announceMessage = `Player ${this.state.enemyInfor.name} missed!`;
                }
                else {
                    announceMessage = ``;
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
            }
        }

        this.setState({
            squares: squares,
            playerOneIsNext: !this.state.playerOneIsNext,
            setPlaneTurnLeft: setPlaneTurnLeft - 1,
            announce: announceMessage
        });
    }

    RowItems(squares, i) {
        const items = [];
        for (let j = 0; j < FIELD_WIDTH; j++) {
            items.push(
                <Square
                    key={i * FIELD_WIDTH + j}
                    value={this.state.squares[i * FIELD_WIDTH + j]}
                    onClick={() => this.handleClick(i * FIELD_WIDTH + j)}
                />
            );
        }

        return <Row key={i}>{items}</Row>;
    }

    renderBoard(squares) {
        const items = [];
        for (let i = 0; i < FIELD_HEIGHT; i++) {
            items.push(
                this.RowItems(squares, i)
            );
        }

        return items;
    }

    render() {
        if(!this.state.loggedIn){
            return <Redirect  to='/login' />
        }
        else if (this.state.isAdmin) {
            return <Redirect to={{ pathname: '/admin/user-list' }} />
        }

        const {squares, playerOneIsNext, announce, setPlaneTurnLeft} = this.state;
        const winner = this.calculateWinner();
        let status;
        if (winner) {
            status = 'Winner: ' + winner.message;
            if(winner.youWin){
                this.state.congratulationFrame = true
            }
            else{
                this.state.sorryFrame = true
            }
        } else {
            if (playerOneIsNext && setPlaneTurnLeft > 0) {
                status = 'Your turn to place ship';
            }
            else if (playerOneIsNext && setPlaneTurnLeft <= 0) {
                status = "Your turn to shoot";
            } else {
                status = `Wait for ${this.state.enemyInfor.name}`;
            }
        }

        return (
            <Layout className="layout">
                <NavBar />
                <Content className='game-play'>
                    <div className='site-layout-content-board'>
                        <Row style={{minHeight: 70}}><h1 className="announce">{announce}</h1></Row>
                        <Row style={{minHeight: 50}}><h2 className="status">{status}</h2></Row>
                        <Row>
                            <Col span={12} style={{display: 'flex'}}>
                                <div className={!playerOneIsNext ? '' : 'bordered'} style={{display: 'inherit', padding: 10, margin: 15}}>
                                    <Avatar src={this.state.user.avartar_url} />
                                    <span className='header__avatar--name' >
                                        <span className='header__avatar--user'>{this.state.user.name}</span>
                                        <span className='header__avatar--rank'>Point: {this.state.user.ranking_point}</span>
                                    </span>
                                </div>
                            </Col>
                            <Col span={12} style={{height: '100%', display: 'flex'}}>
                                <div className={playerOneIsNext ? '' : 'bordered'} style={{padding: 10, margin: 15, display: 'inherit', float: "right", marginLeft: 'auto', order: 2}}>
                                    <Avatar src={this.state.enemyInfor.avartar_url} />
                                    <span className='header__avatar--name' >
                                        <span className='header__avatar--user'>{this.state.enemyInfor.name}</span>
                                        <span className='header__avatar--rank'>Point: {this.state.enemyInfor.ranking_point}</span>
                                    </span>
                                </div>
                            </Col>
                        </Row>

                        {this.renderBoard(squares)}
                    </div>
                </Content>
                <Congratulation visible ={this.state.congratulationFrame} />
                <Sorry visible = {this.state.sorryFrame}/>
            </Layout>
        );
    }
}

export default Board;
