
// works...
// import rs from '../game/rotation_system'
import TETRIS from '../game/tetris';
import { TetrominoFactory, TETROMINOS } from '../game/tetronimo';


beforeAll(() => {
  TETRIS.Game.init_test(10, 10);
});

beforeEach(() => {

  var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]
  ]
  TETRIS.Game.board.setBoard(board);
});

test('getBoard() basic test', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 0, 0);
  TETRIS.Game.board.falling = falling;
	expect(TETRIS.Game.getBoard()).toStrictEqual([
    [7, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 7, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]

   ]);
});


test('getBoard() basic test 2', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 0);
  TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.getBoard()).toStrictEqual([
    [0, 0, 0, 7, 7, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]

   ]);
});

test('getBoard() basic test 3', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 4);
  TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.getBoard()).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 7, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]

   ]);
});


test('getBoard() basic test I', () => {
  var falling = TetrominoFactory(TETROMINOS.I, 0, 0);
  TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.getBoard()).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]

   ]);
});

test('getBoard() off board test I', () => {
  var falling = TetrominoFactory(TETROMINOS.I, 0, -1);
  TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.getBoard()).toStrictEqual([
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1],
    [1, 1, 1, 1, 2, 2, 1, 0, 0, 1]

   ]);
});


test('TETRIS.Game.board.collides no collision', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 4);
  //TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.board.collides(0, 0, falling)).toBe(false);
});

test('TETRIS.Game.board.collides basic collision test', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 4);
  expect(TETRIS.Game.board.collides(0, 1, falling)).toBe(true);
});

test('TETRIS.Game.board.collides collision test with both offsets', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 4);
  //TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.board.collides(1, 1, falling)).toBe(true);
});

test('TETRIS.Game.board.collides spawn position, no collision', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 0);
  //TETRIS.Game.board.falling = falling;
  expect(TETRIS.Game.board.collides(0, 0, falling)).toBe(false);
});

test('TETRIS.Game.board.collides top out', () => {
  var falling = TetrominoFactory(TETROMINOS.Z, 3, 0);
  expect(TETRIS.Game.board.collides(0, -1, falling)).toBe(true);
});

test('TETRIS.Game.board.collides I test off board but shape is on board', () => {
  var falling = TetrominoFactory(TETROMINOS.I, 0, -1);
  expect(TETRIS.Game.board.collides(0, 0, falling)).toBe(false);
});

test('TETRIS.Game.board.collides I test off board but shape is on board', () => {
  var falling = TetrominoFactory(TETROMINOS.I, 0, -2);
  expect(TETRIS.Game.board.collides(0, 0, falling)).toBe(true);
});





