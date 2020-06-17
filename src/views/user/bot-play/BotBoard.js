import React, { Component } from 'react';
import {Button, Row} from "antd";
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

class BotBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(FIELD_WIDTH * FIELD_HEIGHT).fill(null),
            playerOneIsNext: true,
            setPlaneTurnLeft: MAX_PLANE * 2,
            announce: ''
        }
    }

    calculateWinner = () => {
        const {squares, setPlaneTurnLeft} = this.state;

        if (setPlaneTurnLeft > 0) return null;

        let playerOneDeadPlaneCount = 0;
        let playerTwoDeadPlaneCount = 0;

        for (let i = 0; i < FIELD_WIDTH * FIELD_HEIGHT - 1; i++) {
            if (squares[i] == PLANE_ONE_DEAD) {
                playerOneDeadPlaneCount += 1;
            }
            if (squares[i] == PLANE_TWO_DEAD) {
                playerTwoDeadPlaneCount += 1;
            }
        }

        if (playerOneDeadPlaneCount >= MAX_PLANE) return 'Player Two Win';
        if (playerTwoDeadPlaneCount >= MAX_PLANE) return 'Player One Win';

        return null;
    }

    handleClick(i) {
        const {playerOneIsNext, setPlaneTurnLeft} = this.state;
        const squares = this.state.squares.slice();
        let announceMessage = '';
        // neu co nguoi thang => game over
        if (this.calculateWinner()) {
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
        /* player 2's turn */
        else {
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
                    value={this.state.squares[i * 10 + j]}
                    onClick={() => this.handleClick(i * 10 + j)}
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
        const {squares, playerOneIsNext, announce} = this.state;
        const winner = this.calculateWinner();
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (playerOneIsNext ? 'Player One' : 'Player Two');
        }

        return (
            <div>
                <Row style={{height:50}}><h1 className="announce">{announce}</h1></Row>
                <Row style={{height:50}}><h2 className="status">{status}</h2></Row>
                {this.renderBoard(squares)}
            </div>
        );
    }
}

export default BotBoard;
