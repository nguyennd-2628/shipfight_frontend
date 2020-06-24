import React, { Component } from 'react';
import {Avatar, Button, Layout, Row, Col} from "antd";
import Congratulation from '../../../components/congratulation/Congratulations'
import {CrownOutlined} from '@ant-design/icons';
import '../game-play/Board.css'
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

class BotBoard2 extends Component {
    constructor(props) {
        super(props);
        const userToken = localStorage.getItem("user") || null;            // get default user infor
        const loggedIn  = (userToken === null) ? false : true;
        const user = (loggedIn) ? JSON.parse(userToken) : null;
        let isAdmin = true;
        if( user === null) isAdmin = false;
        else if( user.role === 'user' ) isAdmin = false;

        this.state = {
            user,
            loggedIn,
            isAdmin,
            squares: Array(FIELD_WIDTH * FIELD_HEIGHT).fill(null),
            playerOneIsNext: true,
            setPlaneTurnLeft: MAX_PLANE * 2,
            announce: '',
            congratulationFrame: false,
            sorryFrame: false
        }
    }

    componentWillUnmount(){
        this.props.socket.emit("c2s_end_game")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {playerOneIsNext} = this.state;
        if (!playerOneIsNext) {
            this.waitPlayerTwo();
        }
    }

    waitPlayerTwo = () => {
        const {squares} = this.state;
        let botRandomPosition = Math.floor(Math.random() * FIELD_WIDTH * FIELD_HEIGHT);
        while (squares[botRandomPosition] === PLANE_ONE_DEAD ||
            squares[botRandomPosition] === PLANE_TWO_DEAD ||
            squares[botRandomPosition] === PLANE_TWO_ALIVE ||
            squares[botRandomPosition] === PLANE_ONE_MISSED ||
            squares[botRandomPosition] === PLANE_TWO_MISSED
            ){
            botRandomPosition = Math.floor(Math.random() * FIELD_WIDTH * FIELD_HEIGHT);
        }
        setTimeout(() => this.handlePlayerTwoTurn(botRandomPosition), 1000);
    };

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

        if (playerOneDeadPlaneCount >= MAX_PLANE){
            return 'Player Two Win';
        }
        if (playerTwoDeadPlaneCount >= MAX_PLANE){
            return 'Player One Win';
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
                    announceMessage = `Player 1 placed a plane`;
                }
                else if (squares[i] === PLANE_TWO_ALIVE){
                    squares[i] = PLANE_TWO_EXPOSED;
                    this.setState({
                        squares: squares,
                        announce: `Detected player2 plane.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_TWO_EXPOSED){
                    this.setState({
                        announce: `Detected player2 plane.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_ONE_ALIVE || squares[i] === PLANE_ONE_EXPOSED){
                    announceMessage = 'This position has already been placed plane.\nPlease choose another position!';
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
                    announceMessage = `Shot HIT!!\nA plane of player2 has been terminated`;
                }
                else if (squares[i] === PLANE_ONE_ALIVE || squares[i] === PLANE_ONE_EXPOSED){
                    announceMessage = `Can't shoot allies plane.\nPlease choose another position!`;
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
                else if (squares[i] === null){
                    squares[i] = PLANE_ONE_MISSED;
                    announceMessage = `Player1 missed!`;
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
            // this.setState({
            //     sorryFrame : true
            // })
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
                    announceMessage = `Player 2 placed a plane`;
                }
                else if (squares[i] === PLANE_ONE_ALIVE){
                    squares[i] = PLANE_ONE_EXPOSED;
                    this.setState({
                        squares: squares,
                        announce: `Detected player1 plane.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_ONE_EXPOSED){
                    this.setState({
                        announce: `Detected player1 plane.\nPlease choose another position!`
                    });
                    return;
                }
                else if (squares[i] === PLANE_TWO_ALIVE || squares[i] === PLANE_TWO_EXPOSED){
                    announceMessage = 'This position has already been placed plane.\nPlease choose another position!';
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
                    announceMessage = `Shot HIT!!\nA plane of player1 has been terminated`;
                }
                else if (squares[i] === PLANE_TWO_ALIVE || squares[i] === PLANE_TWO_EXPOSED){
                    announceMessage = `Can't shoot allies plane.\nPlease choose another position!`;
                    this.setState({
                        announce: announceMessage
                    });
                    return;
                }
                else if (squares[i] === null){
                    squares[i] = PLANE_TWO_MISSED;
                    announceMessage = `Player2 missed!`;
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
                    key={i * 10 + j}
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

        const {squares, playerOneIsNext, announce} = this.state;
        const winner = this.calculateWinner();
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            this.state.congratulationFrame = true
        } else {
            status = 'Next player: ' + (playerOneIsNext ? 'Player One' : 'Player Two');
        }

        return (
            <Layout className="layout">
                <NavBar />
                <Content className='game-play'>
                    <div className='site-layout-content-board'>
                        <Row style={{height: 50}}><h1 className="announce">{announce}</h1></Row>
                        <Row style={{height: 50}}><h2 className="status">{status}</h2></Row>
                        <Row style={{height: 60}}>
                            <Col span={12} style={{height: '100%', display: 'flex'}}>
                                <div style={{display: 'inherit'}}>
                                    <Avatar src={this.state.user.avartar_url} />
                                    <span className='header__avatar--name' >
                                        <span className='header__avatar--user'>{this.state.user.name}</span>
                                        <span className='header__avatar--rank'>Point: {this.state.user.ranking_point}</span>
                                    </span>
                                </div>
                            </Col>
                            <Col span={12} style={{height: '100%', display: 'flex'}}>
                                <div style={{display: 'inherit', float: "right", marginLeft: 'auto', order: 2}}>
                                    <Avatar src='data:image/jpeg;base64,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' />
                                    <span className='header__avatar--name' >
                                        <span className='header__avatar--user'>Super Bot</span>
                                        <span className='header__avatar--rank'>Point: 9999</span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        {this.renderBoard(squares)}
                    </div>
                </Content>
                <Congratulation visible ={this.state.congratulationFrame} />
            </Layout>
        );
    }
}

export default BotBoard2;
