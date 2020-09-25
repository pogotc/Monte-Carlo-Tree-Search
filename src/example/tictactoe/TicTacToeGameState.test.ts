import TicTacToeGameState from './TicTacToeGameState';

describe('Example game - TicTacToe', () => {
    test('Can setup a board', () => {
        const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const gameState = new TicTacToeGameState(board, 1);
        expect(gameState.getBoard()).toEqual(board);
    });

    test('Can find the possible moves', () => {
        const emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const emptyGameState = new TicTacToeGameState(emptyBoard, 1);
        const emptyGameMoves = emptyGameState.getPossibleMoves();
        expect(emptyGameMoves).toHaveLength(9);

        const nearFullBoard = [1, 2, 2, 2, 0, 2, 1, 2, 1];
        const nearFullGameState = new TicTacToeGameState(nearFullBoard, 1);
        const nearFullGameMoves = nearFullGameState.getPossibleMoves();
        expect(nearFullGameMoves).toHaveLength(1);
    });

    test('Can update the board', () => {
        const emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const emptyGameState = new TicTacToeGameState(emptyBoard, 1);
        const updatedState = emptyGameState.applyAction({ move: 0, player: 1 });
        expect(updatedState.getBoard()).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('Can get the status', () => {
        const emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const emptyGameState = new TicTacToeGameState(emptyBoard, 1);
        expect(emptyGameState.getStatus()).toEqual('IN_PROGRESS');

        const horizontalWinBoard = [1, 1, 1, 2, 0, 2, 0, 0, 0];
        const horizontalWinBoardState = new TicTacToeGameState(horizontalWinBoard, 1);
        expect(horizontalWinBoardState.getStatus()).toEqual(1);

        const horizontalWin2Board = [1, 2, 1, 2, 2, 2, 0, 0, 0];
        const horizontalWin2BoardState = new TicTacToeGameState(horizontalWin2Board, 1);
        expect(horizontalWin2BoardState.getStatus()).toEqual(2);

        const verticalWinBoard = [1, 2, 1, 1, 0, 2, 1, 0, 0];
        const verticalWinBoardState = new TicTacToeGameState(verticalWinBoard, 1);
        expect(verticalWinBoardState.getStatus()).toEqual(1);

        const verticalWin2Board = [1, 2, 1, 0, 2, 2, 1, 2, 0];
        const verticalWin2BoardState = new TicTacToeGameState(verticalWin2Board, 1);
        expect(verticalWin2BoardState.getStatus()).toEqual(2);

        const diagonalWinBoard = [1, 2, 1, 0, 1, 2, 1, 0, 1];
        const diagonalWinBoardState = new TicTacToeGameState(diagonalWinBoard, 1);
        expect(diagonalWinBoardState.getStatus()).toEqual(1);

        const diagonalWin2Board = [1, 2, 2, 0, 2, 2, 2, 0, 1];
        const diagonalWin2BoardState = new TicTacToeGameState(diagonalWin2Board, 1);
        expect(diagonalWin2BoardState.getStatus()).toEqual(2);

        const diagonalWin3Board = [0, 0, 1, 2, 1, 1, 1, 0, 2];
        const diagonalWin3BoardState = new TicTacToeGameState(diagonalWin3Board, 1);
        expect(diagonalWin3BoardState.getStatus()).toEqual(1);

        const drawBoard = [1, 2, 1, 1, 2, 2, 2, 1, 1];
        const drawBoardState = new TicTacToeGameState(drawBoard, 1);
        expect(drawBoardState.getStatus()).toEqual('DRAW');
    });

    test('Can identify the end of the game', () => {
        const diagonalWinBoard = [1, 2, 1, 0, 1, 2, 1, 0, 1];
        const diagonalWinBoardState = new TicTacToeGameState(diagonalWinBoard, 1);
        expect(diagonalWinBoardState.isEndOfGame()).toBeTruthy();

        const drawBoard = [1, 2, 1, 1, 2, 2, 2, 1, 1];
        const drawBoardState = new TicTacToeGameState(drawBoard, 1);
        expect(drawBoardState.isEndOfGame()).toBeTruthy();

        const emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const emptyGameState = new TicTacToeGameState(emptyBoard, 1);
        expect(emptyGameState.isEndOfGame()).toBeFalsy();
    });
});
