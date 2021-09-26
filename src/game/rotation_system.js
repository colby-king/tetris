

class RotationSystem {

	constructor(strategy, collides){
		this.strategy = strategy;
		this.collides = collides;
	}

	rotate(tetromino){
		return this.strategy(tetromino, this.collides);
	}

}

function SRS(tetromino, collides){

	let piece = copyTetromino(tetromino);
	piece.shape = rotateRight(piece.shape);

	if(!collides(0, 0, piece)){
		return piece;
	}
	// Otherwise return original state 
	return tetromino;



	// 1. save state of original shape
	// 2. rotate the array
	// 3. Check for a collision 
	// 4. return updated tetromino

}

function rotateRight(shape){

	let h = shape[0].length;
	let w = shape.length;

	// initialize new array 
	var rotatedShape = new Array(h);
	for(let i = 0; i < rotatedShape.length; i++){
		rotatedShape[i] = new Array(w);
	}


	let curCol = shape.length - 1; 
	for(let i = 0; i < shape.length; i++){
		for(let j = 0; j < shape[i].length; j++){
			rotatedShape[j][curCol] = shape[i][j];
		}
		curCol--;
	}
	return rotatedShape;
}



/* Helper functions for handling rotation */
function copy2DArray(arrayOfArrays){
	return arrayOfArrays.map(function(array){
		return array.slice();
	});
}

function copyTetromino(piece){
	return {
		coords: {
			x: piece.coords.x,
			y: piece.coords.y
		},
		shape: copy2DArray(piece.shape)
	};
}


export {
	RotationSystem,
	SRS,
	rotateRight
}
