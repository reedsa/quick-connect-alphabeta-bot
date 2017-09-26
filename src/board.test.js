import test from 'ava';
import {
  isGameComplete,
  getScore,
  scorePosition,
} from './board';

// Is Game Complete
test('isGameComplete: determines if the game is finished', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1, 0],
    boardHeights: [3, 3],
    isPlayer0First: true,
  };
  const player = 0;
  const score = 100000;

  t.true(isGameComplete(gameState, player, score));
});

test('isGameComplete: determines if the game is tied (board is full)', t => {
  const gameState = {
    winCondition: [3],
    moves: [0, 1, 1, 0, 0, 1],
    boardHeights: [3, 3],
    isPlayer0First: true,
  };
  const player = null;
  const score = null;

  t.true(isGameComplete(gameState, player, score));
});

test('isGameComplete: determines if the game is not complete', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1],
    boardHeights: [3, 3],
    isPlayer0First: true,
  };
  const player = null;
  const score = 5;

  t.false(isGameComplete(gameState, player, score));
});

// Score Position
test('scorePosition: returns the winning score', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1, 0],
    boardHeights: [3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  t.deepEqual(scorePosition(gameState, 0, 0, 0, 1), {
    player: 0,
    score: 100000,
  });
});

test('scorePosition: returns the score for current game state', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1],
    boardHeights: [3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  t.deepEqual(scorePosition(gameState, 0, 0, 0, 1), {
    player: null,
    score: 1,
  });
});

// Score
test('Score: returns the score', t => {
  const gameState = {
    winCondition: [2],
    moves: [0, 1],
    boardHeights: [3, 3],
    isPlayer0First: true,
    iAmPlayer0: true,
  };

  t.deepEqual(getScore(gameState), { player: null, score: 3 });
});
