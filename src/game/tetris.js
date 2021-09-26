import { RotationSystem, SRS } from './rotation_system';
import { TetrominoQueue, TetrominoFactory } from './tetronimo';
import * as Config from '../app_constants';




var TETRIS = TETRIS || {};


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
			case Config.actions.SHIFT_LEFT:
				if(!this.collides(-1, 0, this.falling)){
					this.falling.coords.x--;
				}
				break;
			case Config.actions.SHIFT_RIGHT:
				if(!this.collides(1, 0, this.falling)){
					this.falling.coords.x++;
				}
				break;
			case Config.actions.SHIFT_DOWN:
				if(!this.collides(0, 1, this.falling)){
					this.falling.coords.y++;
				}
				break;
			case Config.actions.ROTATE:
				this.falling = this.rotater.rotate(this.falling);
				break;
			case Config.actions.HARD_DROP:
				while(!this.collides(0, 1, this.falling)){
					this.falling.coords.y++;
				}
				break;
		}
	}

	collides(xOffset, yOffset, piece){
		// falling shape coordinates 
		let x = piece.coords.x,
			y = piece.coords.y;
		//console.log(yOffset, xOffset, piece);
		for(let i = 0; i < piece.shape.length; i++){
			for(let j = 0; j < piece.shape[i].length; j++){
				// get x, y coordinates on the board 
				var CUR_Y = (y + i);
				var CUR_X = (x + j);
				// if the space isn't empty 
				if(piece.shape[i][j]){
					try{
						if(this.board[CUR_Y + yOffset][CUR_X + xOffset] === undefined){ // out of bounds
							return true;
						} else if(this.board[CUR_Y + yOffset][CUR_X + xOffset] > 0){ // space occupied
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

	// Checks if a row can be cleared 
	rowIsFull(index){
		for(let i = 0; i < this.board[0].length; i++){
			if(this.board[index][i] === 0 ){
				return false;
			}
		}
		return true;
	}

	// clears marked rows and shifts the board down
	clearLines(){
		for(let i = 0; i < this.board.length; i++){
			if(this.board[i] === null){
				for(let j = i; j > 0; j--){
					this.board[j] = this.board[j-1];
				}
				this.board[0] = new Array(this.boardWidth).fill(0);
			}
		}

	}

	checkLineClears(){
		// Optimize to only check around where the last piece landed 
		let height = this.falling.shape.length;
		let y = this.falling.coords.y; 
		let linesCleared = 0; 
		for(let i = 0; i < this.boardHeight; i++){
			if(this.rowIsFull(i)){
				this.board[i] = null;
				linesCleared += 1; 
			}
		}
		this.clearLines();
		// return score
		return linesCleared;
	}


	/** Draws the current tetromino in play on the board **/ 
	spawn(piece){
		let gameover = false;
		if(this.collides(0, 0, piece)){
			console.log("GAMEOVER PIECE:");
			console.log(piece);
			piece.coords.y++;
			gameover = true;
		}
		this.falling = piece;
		return gameover;
	}

	// Checks if the current falling piece has landed
	hasLanded(){
		return this.collides(0, 1, this.falling);
	}

	update(){
		this.board = this.getBoard();
	}

	setBoard(board){
		this.board = board;
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
	board: null,
	queue: null,
	score: 0,
	advance: function(){
		let gameover = false;
		if(this.board.hasLanded()){
			this.board.update();
			// Check for completed lines here.
			this.score += this.board.checkLineClears();
			let nextTet = this.queue.next();
			let gameover = this.board.spawn(nextTet);
			// if(gameover){
			// 	console.log("GAME OVER");
			// 	console.log(nextTet);
			// 	return gameover
			// }


		}
		this.board.fall();
		return gameover;
	},

	init: function(width, height){
		this.board = new GameBoard(width, height, SRS);
		this.queue = new TetrominoQueue();
		let firstTet = this.queue.next();
		this.board.spawn(firstTet);
	},

	init_test: function(width, height){
		this.board = new GameBoard(width, height, SRS);
		this.queue = new TetrominoQueue();
	},

	handleKeyEvent: function(key){
		this.board.move(key);
	},

	getBoard(){
		return this.board.getBoard();
	}


}


export default TETRIS;


