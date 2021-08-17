//import {add, rotateRight} from 'game/rotation_system'
//import { RotationSystem, SRS } from '/Users/colbyking/Documents/projects/tetris/tetris/src/game/rotation_system.js';
import { RotationSystem, SRS } from './rotation_system';
import { TetrominoQueue, TetrominoFactory } from './tetronimo'
// Constants 

var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_RIGHT = 39;
var ARROW_DOWN = 40;


var TETRIS = TETRIS || {};

TETRIS.TETROMINOS = {
	I: 1,
	O: 2,
	T: 3,
	J: 4,
	L: 5,
	S: 6,
	Z: 7
};

TETRIS.CONFIG = {
	START_X: 5,
	START_Y: 0,
	QUEUE_LENGTH: 6,
};

// function TetrominoFactory(t){
// 	var shape;
// 	var pieceType;
// 	switch(t){
// 		case TETRIS.TETROMINOS.I:
// 			shape = [
// 					 [0, 0, 0, 0],
// 					 [1, 1, 1, 1],
// 					 [0, 0, 0, 0],
// 					 [0, 0, 0, 0],
// 					];
// 			pieceType = TETRIS.TETROMINOS.I;
// 			break;
// 		case TETRIS.TETROMINOS.O:
// 			shape = [
// 					 [0, 2, 2, 0],
// 					 [0, 2, 2, 0],
// 					 [0, 0, 0, 0]
// 					];
// 			pieceType = TETRIS.TETROMINOS.O;
// 			break;
// 		case TETRIS.TETROMINOS.T:
// 			shape = [
// 					 [0, 0, 0],
// 				     [3, 3, 3],
// 					 [0, 3, 0]
// 					];
// 			pieceType = TETRIS.TETROMINOS.T;
// 			break;
// 		case TETRIS.TETROMINOS.J:
// 			shape = [
// 					 [4, 0, 0],
// 					 [4, 4, 4],
// 					 [0, 0, 0]
// 					];
// 			pieceType = TETRIS.TETROMINOS.I;
// 			break;
// 		case TETRIS.TETROMINOS.L:
// 			shape = [
// 				     [0, 0, 5],
// 					 [5, 5, 5],
// 					 [0, 0, 0]
// 					];
// 			break;
// 		case TETRIS.TETROMINOS.S:
// 			shape = [
// 					 [0, 6, 6],
// 					 [6, 6, 0],
// 					 [0, 0, 0]
// 					];
// 			break;
// 		case TETRIS.TETROMINOS.Z:
// 			shape = [
// 					 [7, 7, 0],
// 					 [0, 7, 7],
// 					 [0, 0, 0]
// 					];
// 			break;
// 		default:
// 			throw new Error("Unable to instantiate tetromino. Invalid identifier: " + t);
// 	}
// 	// Set default starting coordinates 
// 	let piece = {
// 		type: pieceType,
// 		coords: {
// 			x: TETRIS.CONFIG.START_X,
// 			y: TETRIS.CONFIG.START_Y
// 		},
// 		shape: shape
// 	};
// 	return piece; 
// }

// class TetrominoQueue {
// 	constructor(){
// 		this.queue = [];
// 		this.queue_init();
// 	}

// 	generateNextTetromino(){
// 		var NUM_PIECES = TETRIS.TETROMINOS.Z;
// 		var pieceId = Math.floor(Math.random() * (NUM_PIECES) + 1);
// 		var nextPiece = TetrominoFactory(pieceId);
// 		return nextPiece;
// 	}

// 	queue_init(){
// 		for(var i = 0; i < TETRIS.CONFIG.QUEUE_LENGTH; i++){
// 			this.queue.push(this.generateNextTetromino());
// 		}

// 	}

// 	next(){
// 		this.queue.push(this.generateNextTetromino());
// 		return this.queue.shift();
// 	}
// }

class GameBoard {
	constructor(width, height, rotationStrategy){
		this.board = [];
		this.boardWidth = width;
		this.boardHeight = height;
		this.init(width, height);
		this.falling = null;
		this.rotater = new RotationSystem(rotationStrategy, this.collides.bind(this));
	}

	init(width, height){
		for(var i = 0; i < height; i++){
			this.board.push(new Array(width).fill(0));
		}
	}

	// Advances the current falling tetronimo
	fall(){
		this.falling.coords.y++;
	}

	move(key){
		switch(key){
			case ARROW_LEFT:
				if(!this.collides(-1, 0, this.falling)){
					this.falling.coords.x--;
				}
				break;
			case ARROW_RIGHT:
				if(!this.collides(1, 0, this.falling)){
					this.falling.coords.x++;
				}
				break;
			case ARROW_DOWN:
				if(!this.collides(0, 1, this.falling)){
					this.falling.coords.y++;
				}
				break;
			case ARROW_UP:
				this.falling = this.rotater.rotate(this.falling);
		}
	}

	collides(xOffset, yOffset, piece){
		// falling shape coordinates 
		let x = piece.coords.x,
			y = piece.coords.y;

		for(let i = 0; i < piece.shape.length; i++){
			for(let j = 0; j < piece.shape[i].length; j++){
				// get x, y coordinates on the board 
				var CUR_Y = (y + i);
				var CUR_X = (x + j);
				// if the space isn't empty 
				if(piece.shape[i][j]){
					try{
						if(this.board[CUR_Y + yOffset][CUR_X + xOffset] === undefined || // out of bounds
						   this.board[CUR_Y + yOffset][CUR_X + xOffset] > 0){ // space occupied
							return true;
						}
					// collision: out of bounds 
					} catch (err){
						return true;
					}
				}
			}
		}
		// no collision
		return false;

	}

	/** Draws the current tetromino in play on the board **/ 
	placeTetromino(piece){
		this.falling = piece;
	}

	// Checks if the current falling piece has landed
	hasLanded(){
		let x = this.falling.coords.x;
		let y = this.falling.coords.y; 
		for(let i = 0; i < this.falling.shape.length; i++){
			for(let j = 0; j < this.falling.shape[i].length; j++){
				var CUR_Y = (y + i);
				var CUR_X = (x + j);
				if(this.falling.shape[i][j]){
					try{
						if(this.board[CUR_Y + 1][CUR_X]){
							return true;
						}
					} catch (err){
						return true;
					}
				}
			}
		}
		return false;
	}

	getBoard(){
		var START_X = this.falling.coords.x;
		var START_Y = this.falling.coords.y;
		var P_HEIGHT = this.falling.shape.length;
		var P_LENGTH = this.falling.shape[0].length;
		var END_X = START_X + P_LENGTH;
		var END_Y = START_Y + P_HEIGHT;

		const tmpBoard = this.board.map((row, y, b) => {
			return row.map((cell, x, r) => {
				if ((y >= START_Y && y < END_Y) && (x >= START_X && x < END_X)){
					return this.falling.shape[y - START_Y][x - START_X] || cell;
				} else {
					return cell;
				}
			});
		});

		return tmpBoard;
	}
}

TETRIS.Game = TETRIS.Game || {
	board: new GameBoard(10, 24, SRS),
	queue: new TetrominoQueue(),
	counter: 0,
	advance: function(){
		if(this.board.hasLanded()){
			// Check for completed lines here.
			this.board.board = this.board.getBoard();
			let nextTet = this.queue.next();
			this.board.placeTetromino(nextTet);
		}
		this.board.fall();
	},

	init: function(){
		let firstTet = this.queue.next();
		this.board.placeTetromino(firstTet);
	},

	handleKeyEvent: function(key){
		this.board.move(key);
	}


}


export default TETRIS;
//module.exports = TETRIS

