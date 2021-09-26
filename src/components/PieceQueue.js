import TETRIS from '../game/tetris';
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
//import Cell from '../index.js'


class Cell extends React.Component {

	constructor(props){
		super(props);
	}

	render (){
		return (
      		<div className={"square color-" + this.props.val}></div>
		)
	}
}


class PieceQueue extends React.Component {

	constructor(props){
		super(props);
	}

	updateQueueState(q){
		console.log('Updating Queue')
	}

	render (){
		let x = 2;
		let q = TETRIS.Game.queue.queue;

		let tetQ = []
		for(let k = 0; k < q.length; k++){
			var grid = [];
			for (var i = 0; i < q[k].shape.length; i++){
				var row = []
				for(var j = 0; j < q[k].shape[i].length; j++){
					row.push(<Cell val={q[k].shape[i][j]}/>);
				}
				grid.push(<div className="board-row">{row}</div>);
			}
			tetQ.push(<div className="piece-queue-box blah">{grid}</div>);
		}
		
		return (
      		<div className="piece-queue">
      			<h1>hello world</h1>
      			<h1>{q[0].shape.length}</h1>
      			{tetQ}
      		</div>
		)
	}
}


export default PieceQueue;