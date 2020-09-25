import MCTSGameState, { Move, Action } from '../../MCTSGameState';

export default class TicTacToeGameState extends MCTSGameState {
    getPossibleMoves(): Array<Move> {
        const moves = [];
        this.getBoard().forEach((value, position) => {
            if (value === 0) {
                moves.push(position);
            }
        });
        return moves;
    }
    applyAction(action: Action): MCTSGameState {
        const updatedBoard = [...this.getBoard()];
        updatedBoard[action.move] = action.player;
        return new TicTacToeGameState(updatedBoard, action.player);
    }
    getStatus(): any {
        const board = this.getBoard();
        for (let row = 0; row < 3; row++) {
            const pos = row * 3;
            if (board[pos] !== 0 && board[pos] === board[pos + 1] && board[pos + 1] === board[pos + 2]) {
                return board[pos];
            }
        }

        for (let col = 0; col < 3; col++) {
            if (board[col] !== 0 && board[col] === board[col + 3] && board[col + 3] === board[col + 6]) {
                return board[col];
            }
        }

        if (board[0] !== 0 && board[0] === board[4] && board[4] === board[8]) {
            return board[0];
        }

        if (board[2] !== 0 && board[2] === board[4] && board[4] === board[6]) {
            return board[2];
        }

        if (this.getPossibleMoves().length === 0) {
            return 'DRAW';
        }

        return 'IN_PROGRESS';
    }
    isEndOfGame(): boolean {
        return this.getStatus() !== 'IN_PROGRESS';
    }
}
