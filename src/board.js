import { BotUtils } from 'quick-connect-js-bot';

function isGameComplete(gameState, player, score) {
  return score === 100000 || score === -100000 || BotUtils.isBoardFull(gameState);
}

function getScore(gameState) {
  const winCount = gameState.winCondition[0];

  let points = 0;

  let vertical_points = 0;
  let horizontal_points = 0;
  let diagonal_points1 = 0;
  let diagonal_points2 = 0;

  for (let col = 0; col < gameState.boardHeights.length; col++) {
    for (let row = 0; row < gameState.boardHeights[col] - winCount + 1; row++) {
      let { score, player } = scorePosition(gameState, col, row, 0, 1);
      if (score == 100000) return { player, score };
      if (score == -100000) return { player, score };
      vertical_points += score;
    }
  }

  for (let col = 0; col < gameState.boardHeights.length - winCount + 1; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      let { score, player } = scorePosition(gameState, col, row, 1, 0);
      if (score == 100000) return { player, score };
      if (score == -100000) return { player, score };
      horizontal_points += score;
    }
  }

  for (let col = 0; col < gameState.boardHeights.length - winCount + 1; col++) {
    for (let row = 0; row < gameState.boardHeights[col] - winCount + 1; row++) {
      let { score, player } = scorePosition(gameState, col, row, 1, 1);
      if (score == 100000) return { player, score };
      if (score == -100000) return { player, score };
      diagonal_points1 += score;
    }
  }

  for (let col = 3; col < gameState.boardHeights.length - winCount + 2; col++) {
    for (let row = 0; row < gameState.boardHeights[col]; row++) {
      let { score, player } = scorePosition(gameState, col, row, 1, -1);
      if (score == 100000) return { player, score };
      if (score == -100000) return { player, score };
      diagonal_points2 += score;
    }
  }

  points =
    horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;
  return { player: null, score: points };
}

function scorePosition(gameState, col, row, delta_x, delta_y) {
  const winCount = gameState.winCondition[0];
  const boardState = BotUtils.buildBoardState(
    gameState.moves,
    gameState.boardHeights,
    gameState.isPlayer0First
  );

  let player0Score = 0;
  let player1Score = 0;
  let winner = { player: null, score: 0 };

  if (!BotUtils.containsToken(boardState, col, row)) {
    return winner;
  }

  for (let count = 1; count <= winCount; count++) {
    if (BotUtils.containsToken(boardState, col, row)) {
      if (boardState[col][row] === 0) {
        player0Score++;
      } else if (boardState[col][row] === 1) {
        player1Score++;
      }
    }
    row += delta_y;
    col += delta_x;
  }

  if (player0Score === winCount) {
    winner.player = 0;
    winner.score = gameState.iAmPlayer0 ? 100000 : -100000;
  } else if (player1Score === winCount) {
    winner.player = 1;
    winner.score = gameState.iAmPlayer0 ? -100000 : 100000;
  } else {
    winner.player = null;
    winner.score = gameState.iAmPlayer0 ? player0Score : player1Score;
  }
  return winner;
}

export {
  isGameComplete,
  getScore,
  scorePosition,
};
