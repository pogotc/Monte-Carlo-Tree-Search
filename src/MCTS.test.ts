import MCTS from './MCTS';
import { ThreeInARowGameState } from './testHelper';
import TicTacToeGameState from './example/tictactoe/TicTacToeGameState';

describe('MCTS', () => {
    // let mcts;

    test('Test run for a single move', () => {
        const mcts = new MCTS();
        const gameState = new ThreeInARowGameState([0, 2, 2, 1, 1, 0, 0, 0, 0]);
        const bestMove = mcts.findNextMove(gameState, 1);
        expect(bestMove).toEqual(5);
    });

    test('failed scenario', () => {
        const mcts = new MCTS();
        const gameState = new TicTacToeGameState([0, 0, 2, 2, 1, 1, 0, 0, 1]);
        const bestMove = mcts.findNextMove(gameState, 2);
        expect(bestMove).toEqual(0);
    });

    test('failed scenario - 2', () => {
        const mcts = new MCTS();
        const gameState = new TicTacToeGameState([0, 0, 0, 1, 1, 0, 2, 0, 0]);
        const bestMove = mcts.findNextMove(gameState, 2);
        expect(bestMove).toEqual(5);
    });

    // test('Playing TicTacToe', () => {
    //     const mcts = new MCTS();
    //     let gameState = new TicTacToeGameState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    //     // player one
    //     gameState = gameState.applyAction({ move: 4, player: 1 });
    //     // console.log(gameState.getPlayer());

    //     // CPU first move
    //     let bestMove = mcts.findNextMove(gameState, 2);
    //     gameState = gameState.applyAction({ move: bestMove, player: 2 });

    //     // player one - second move
    //     gameState = gameState.applyAction({ move: 5, player: 1 });
    //     bestMove = mcts.findNextMove(gameState, 2);
    //     expect(bestMove).toEqual(3);
    // });
});
