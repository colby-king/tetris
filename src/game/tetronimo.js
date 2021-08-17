

// Add constants...

let TETROMINOS = {
	I: 1,
	O: 2,
	T: 3,
	J: 4,
	L: 5,
	S: 6,
	Z: 7
};

function TetrominoFactory(t){
	var shape;
	var pieceType;
	switch(t){
		case TETROMINOS.I:
			shape = [
					 [0, 0, 0, 0],
					 [1, 1, 1, 1],
					 [0, 0, 0, 0],
					 [0, 0, 0, 0],
					];
			pieceType = TETROMINOS.I;
			break;
		case TETROMINOS.O:
			shape = [
					 [0, 2, 2, 0],
					 [0, 2, 2, 0],
					 [0, 0, 0, 0]
					];
			pieceType = TETROMINOS.O;
			break;
		case TETROMINOS.T:
			shape = [
					 [0, 0, 0],
				     [3, 3, 3],
					 [0, 3, 0]
					];
			pieceType = TETROMINOS.T;
			break;
		case TETROMINOS.J:
			shape = [
					 [4, 0, 0],
					 [4, 4, 4],
					 [0, 0, 0]
					];
			pieceType = TETROMINOS.I;
			break;
		case TETROMINOS.L:
			shape = [
				     [0, 0, 5],
					 [5, 5, 5],
					 [0, 0, 0]
					];
			break;
		case TETROMINOS.S:
			shape = [
					 [0, 6, 6],
					 [6, 6, 0],
					 [0, 0, 0]
					];
			break;
		case TETROMINOS.Z:
			shape = [
					 [7, 7, 0],
					 [0, 7, 7],
					 [0, 0, 0]
					];
			break;
		default:
			throw new Error("Unable to instantiate tetromino. Invalid identifier: " + t);
	}
	// Set default starting coordinates 
	let piece = {
		type: pieceType,
		coords: {
			x: 5,
			y: 0
		},
		shape: shape
	};
	return piece; 
}

class TetrominoQueue {
	constructor(){
		this.queue = [];
		this.queue_init();
	}

	generateNextTetromino(){
		var NUM_PIECES = TETROMINOS.Z;
		var pieceId = Math.floor(Math.random() * (NUM_PIECES) + 1);
		var nextPiece = TetrominoFactory(pieceId);
		return nextPiece;
	}

	queue_init(){
		for(var i = 0; i < 6; i++){
			this.queue.push(this.generateNextTetromino());
		}

	}

	next(){
		this.queue.push(this.generateNextTetromino());
		return this.queue.shift();
	}
}

module.exports = {
	TetrominoQueue,
	TetrominoFactory
}
