import React, { Component } from 'react';
import {Button, Row} from "antd";
import './Board.css'
import {
    FIELD_HEIGHT,
    FIELD_WIDTH,
    MAX_PLANE,
    PLANE_ONE_ALIVE,
    PLANE_TWO_ALIVE,
    PLANE_TWO_DEAD, PLANE_TWO_EXPOSED
} from "../../common/Constant";

function Square(props) {
    return (
        <Button danger className="square" onClick={props.onClick}>
            {props.value}
        </Button>
    );
}

function calculateWinner(squares, setPlaneTurnLeft) {
    if (setPlaneTurnLeft > 0) return null;

    let playerOneLose = true;
    let playerTwoLose = true;

    for (let i = 0; i < MAX_PLANE * MAX_PLANE - 1; i++) {
        if (squares[i] === PLANE_ONE_ALIVE) {
            playerOneLose = false;
        }
        if (squares[i] === PLANE_TWO_ALIVE) {
            playerTwoLose = false;
        }
    }

    if (playerOneLose) return 'Player Two Win';
    if (playerTwoLose) return 'Player One Win';

    return null;
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(MAX_PLANE * MAX_PLANE).fill(null),
            playerOneIsNext: true,
            setPlaneTurnLeft: MAX_PLANE*2
        }
    }

    handleClick(i) {
        const {playerOneIsNext, setPlaneTurnLeft} = this.state;
        const squares = this.state.squares.slice();
        // neu co nguoi thang => game over
        if (calculateWinner(squares)) {
            return;
        }
        /* set plane phase */
        // set plane in empty square
        if (setPlaneTurnLeft > 0 && squares[i] === null) {
            squares[i] = playerOneIsNext ? PLANE_ONE_ALIVE : PLANE_TWO_ALIVE;
        }
        // player one set plane in player 2 plane square
        if (setPlaneTurnLeft > 0 && squares[i] === PLANE_TWO_ALIVE && playerOneIsNext){
            squares[i] = PLANE_TWO_EXPOSED;
        }
        this.setState({
            squares: squares,
            playerOneIsNext: !this.state.playerOneIsNext,
        });
    }

    // renderSquare(i) {
    //     return (
    //         <Square
    //             value={this.state.squares[i]}
    //             onClick={() => this.handleClick(i)}
    //         />
    //     );
    // }

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
        const {squares,playerOneIsNext, setPlaneTurnLeft} = this.state;
        const winner = calculateWinner(squares, setPlaneTurnLeft);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (playerOneIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                {this.renderBoard(squares)}
                {/*<Row>*/}
                {/*    {this.renderSquare(0)}*/}
                {/*    {this.renderSquare(1)}*/}
                {/*    {this.renderSquare(2)}*/}
                {/*</Row>*/}
                {/*<Row>*/}
                {/*    {this.renderSquare(3)}*/}
                {/*    {this.renderSquare(4)}*/}
                {/*    {this.renderSquare(5)}*/}
                {/*</Row>*/}
                {/*<Row>*/}
                {/*    {this.renderSquare(6)}*/}
                {/*    {this.renderSquare(7)}*/}
                {/*    {this.renderSquare(8)}*/}
                {/*</Row>*/}
            </div>
        );
    }
}

export default Board;
