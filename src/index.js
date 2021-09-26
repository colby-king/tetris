import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from 'react';
import TETRIS from 'game/tetris';
import * as Config from 'app_constants';


class Cell extends React.Component {

	constructor(props){
		super(props);

	}

	render (){
		if(this.props.size == 'small'){
			return (
				<div className={"small-square color-" + this.props.val}></div>
			)
		}
		return (
      		<div className={"square color-" + this.props.val}></div>
		)
	}
}



class Board extends React.Component {

	constructor(props){
		super(props);

		let board = this.buildBoard();
		this.state = {
			board: this.props.board
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
	    let gameover = TETRIS.Game.advance();
		this.props.updateBoard();
		if(gameover) clearInterval(this.gameLoopID);
	}

	handleKeys(e){
		e.preventDefault();
		TETRIS.Game.handleKeyEvent(e.keyCode);
		this.updateBoard();
	}

	updateBoard(){
		this.props.updateBoard();
	}


	componentDidMount(){
		this.gameLoopID = setInterval(this.gameLoop, this.props.speed);
		document.addEventListener("keydown", this.handleKeys)
	}


	renderGrid(){
		var gridWidth = this.props.width;
		var gridHeight = this.props.height; 
		var tetrisBoard = this.props.board;
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
			<div>
				<div><h1>TETRIS</h1></div>
				<div>{this.renderGrid()}</div>
			</div>
		);
	}
}

class PieceQueue extends React.Component {

	constructor(props){
		super(props);
	}

	render (){
		let q = TETRIS.Game.queue.queue;

		let tetQ = []
		for(let k = 0; k < q.length; k++){
			var grid = [];
			for (var i = 0; i < q[k].shape.length; i++){
				var row = []
				for(var j = 0; j < q[k].shape[i].length; j++){
					row.push(<Cell size='small' val={q[k].shape[i][j]}/>);
				}
				grid.push(<div className="board-row">{row}</div>);
			}
			tetQ.push(<div className="piece-queue-box">{grid}</div>);
		}
		
		return (
      		<div className="piece-queue">
      			<h2> NEXT </h2>
      			{tetQ}
      		</div>
		)
	}
}

class Game extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			board: TETRIS.Game.board.board,
			speed: 1000,
			gameState: Config.GAME_STATE.PLAYING
		};

		this.updateBoard = this.updateBoard.bind(this);
	}

	updateBoard(){
		let board = TETRIS.Game.board.getBoard();
		this.setState({ 
			board: board
		});
	}



	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board 
						width="10" 
						height="24"
						speed={this.state.speed}
						board={this.state.board}
						updateBoard={this.updateBoard}
					/>
				</div>
				<div className="game-info">
					<PieceQueue/>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	
	}
}

// ========================================

TETRIS.Game.init(Config.BOARD_WIDTH, Config.BOARD_HEIGHT);

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);


