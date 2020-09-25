export type Move = any;

export type Action = {
    move: Move;
    player: number;
};

export default abstract class MCTSGameState {
    #board: Array<any>;
    #player: number;
    constructor(board: Array<any>, player: number) {
        this.#board = board;
        this.#player = player;
    }
    getBoard(): Array<any> {
        return this.#board;
    }

    getPlayer(): number {
        return this.#player;
    }
    setPlayer(player: number): void {
        this.#player = player;
    }
    abstract getPossibleMoves(): Array<Move>;
    abstract applyAction(action: Action): MCTSGameState;
    abstract getStatus(): any;
    abstract isEndOfGame(): boolean;
    // abstract getNextPlayer(): number;
}
