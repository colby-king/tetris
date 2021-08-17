import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from 'react';
import TETRIS from 'game/tetris';

class Cell extends React.Component {

	constructor(props){
		super(props);
	}

	render (){
		return (
      		<div className={"square color-" + this.props.val}>{this.props.val}</div>
		)
	}
}



class Board extends React.Component {

	constructor(props){
		super(props);

		let board = this.buildBoard();
		this.state = {
			counter: TETRIS.TETROMINOS.Z,
			board: TETRIS.Game.board.board
		};

		this.gameLoop = this.gameLoop.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
	}

	buildBoard(){
		let board = new Array(this.props.height);
		for(var i = 0; i < board.length; i++){
			board[i] = new Array(this.props.width);
		}
		return board;
	}


	gameLoop (){
	    TETRIS.Game.advance();
		this.updateBoard();
	}

	handleKeys(e){
		e.preventDefault();
		TETRIS.Game.handleKeyEvent(e.keyCode);
		this.updateBoard();
	}

	updateBoard(){
		this.setState({ 
			board: TETRIS.Game.board.getBoard()
		});
	}


	componentDidMount(){
		setInterval(this.gameLoop, 1000);
		document.addEventListener("keydown", this.handleKeys)
	}


	renderGrid(){
		var gridWidth = this.props.width;
		var gridHeight = this.props.height; 
		var tetrisBoard = this.state.board;
		var grid = [];
		for (var i = 0; i < tetrisBoard.length; i++){
			var row = []
			for(var j = 0; j < tetrisBoard[i].length; j++){
				row.push(<Cell val={tetrisBoard[i][j]}/>);
			}
			grid.push(<div className="board-row">{row}</div>);
		}

		return (
			<div>{grid}</div>
		)
	}

	render() {
		return (
			<div onClick={alert}>
				<div><h1>Tetris Board</h1></div>
				<div>{this.renderGrid()}</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
			<div className="game-board">
			<Board width="10" height="24"/>
			</div>
			<div className="game-info">
		<div>{/* status */}</div>
	<ol>{/* TODO */}</ol>
	</div>
	</div>
	);
	
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

TETRIS.Game.init();
