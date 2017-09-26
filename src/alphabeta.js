import { BotUtils } from 'quick-connect-js-bot';
import { getScore, isGameComplete } from './board';

function maximize(gameState, depth = 8, iterations = 0, alpha, beta) {
  const { player, score } = getScore(gameState);

  if (depth === 0 || isGameComplete(gameState, player, score)) {
    return { move: null, score, iterations };
  }

  const availableMoves = BotUtils.getAllAvailableMoves(gameState);

  let max = { move: null, score: -99999, iterations: iterations };

  for (let i = 0; i < availableMoves.length; i++) {
    const column = availableMoves[i];
    const moves = [...gameState.moves];

    moves.push(column);

    const newGameState = Object.assign({}, gameState, { moves });

    max.iterations += 1;
    const next_move = minimize(
      newGameState,
      depth - 1,
      max.iterations,
      alpha,
      beta
    );

    max.iterations = next_move.iterations;
    if (max.move === null || next_move.score >= max.score) {
      max.move = column;
      max.score = next_move.score;
      alpha = next_move.score;
    }

    if (alpha >= beta) return max;
  }

  return max;
}

function minimize(gameState, depth = 8, iterations = 0, alpha, beta) {
  const { player, score } = getScore(gameState);

  if (depth === 0 || isGameComplete(gameState, player, score))
    return { move: null, score, iterations };

  const availableMoves = BotUtils.getAllAvailableMoves(gameState);

  let min = { move: null, score: 99999, iterations: iterations };

  for (let i = 0; i < availableMoves.length; i++) {
    const column = availableMoves[i];
    const moves = [...gameState.moves];

    moves.push(column);

    const newGameState = Object.assign({}, gameState, { moves });

    min.iterations += 1;
    const next_move = maximize(
      newGameState,
      depth - 1,
      min.iterations,
      alpha,
      beta
    );

    min.iterations = next_move.iterations;
    if (min.move === null || next_move.score <= min.score) {
      min.move = column;
      min.score = next_move.score;
      beta = next_move.score;
    }

    if (alpha >= beta) return min;
  }

  return min;
}

export { maximize, minimize };
