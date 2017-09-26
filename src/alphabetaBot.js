import Bot from 'quick-connect-js-bot';
import { maximize } from './alphabeta';

class AlphabetaBot extends Bot {
  constructor(...args) {
    super(...args);
  }

  decideMove(gameState) {
    const depth = process.env.DEPTH;

    gameState.iAmPlayer0 = this.amIplayer0(gameState);
    const { move, score, iterations } = maximize(gameState, depth);

    // console.log('ITERATIONS', iterations);
    // console.log('MOVE', move);
    // console.log('SCORE', score);
    return move;
  }
}

export default AlphabetaBot;
