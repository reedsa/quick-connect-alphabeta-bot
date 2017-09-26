import test from 'ava';
import { maximize, minimize } from './alphabeta';

test('Alphabeta: maximize for player returns winning score', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1, 0],
    boardHeights: [3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  const bestMove = maximize(gameState, 5, 0);

  t.is(bestMove.move, null);
  t.is(bestMove.score, 100000);
});

test('Alphabeta: maximize for player returns max score for move', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1],
    boardHeights: [3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  const bestMove = maximize(gameState, 5, 0);

  t.is(bestMove.move, 1);
  t.is(bestMove.score, 100000);
});

test('Alphabeta: maximize for player returns column 2 instead of 1', t => {
  const gameState = {
    winCondition: [3],
    moves: [0, 0, 1, 0],
    boardHeights: [3, 3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  const bestMove = maximize(gameState, 5, 0);

  t.is(bestMove.move, 2);
  t.is(bestMove.score, 100000);
});
