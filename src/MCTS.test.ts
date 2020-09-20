import MCTS from './MCTS';
import { ThreeInARowGameState } from './testHelper';

describe('MCTS', () => {
    // let mcts;

    test('Playthrough', () => {
        const mcts = new MCTS();
        const gameState = new ThreeInARowGameState([0, 2, 2, 1, 1, 0, 0, 0, 0], 2);
        const bestMove = mcts.findNextMove(gameState);
        expect(bestMove).toEqual(5);
    });
});
