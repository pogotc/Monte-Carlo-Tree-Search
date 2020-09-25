import MCTSGameState, { Move, Action } from './MCTSGameState';

export class TestGameState extends MCTSGameState {
    getPossibleMoves(): Array<Move> {
        return [];
    }

    applyAction(action: Action): MCTSGameState {
        const updatedBoard = [...this.getBoard()];
        updatedBoard[action.move] = action.player;
        return new TestGameState(updatedBoard, action.player);
    }

    getStatus(): any {
        return 'IN_PROGRESS';
    }

    isEndOfGame(): boolean {
        return false;
    }

    getNextPlayer(): number {
        return 3 - this.getPlayer();
    }
}

export class ThreeInARowGameState extends MCTSGameState {
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
        return new ThreeInARowGameState(updatedBoard, action.player);
    }

    getStatus(): any {
        let lastVal;
        let valsInARow = 1;
        let winner;
        this.getBoard().forEach((value) => {
            if (value === lastVal && value !== 0) {
                valsInARow++;
                if (valsInARow === 3) {
                    winner = value;
                }
            } else {
                valsInARow = 1;
            }
            lastVal = value;
        });

        if (winner) {
            return winner;
        }

        if (this.getPossibleMoves().length === 0) {
            return 'DRAW';
        }

        return 'IN_PROGRESS';
    }

    isEndOfGame(): boolean {
        return this.getStatus() !== 'IN_PROGRESS';
    }

    getNextPlayer(): number {
        return 3 - this.getPlayer();
    }
}
