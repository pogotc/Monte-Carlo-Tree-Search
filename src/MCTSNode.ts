import MCTSGameState, { Action } from './MCTSGameState';
import findBestChildWithUCT from './uct';

export default class MCTSNode {
    state: MCTSGameState;
    parent: MCTSNode;
    children: Array<MCTSNode>;
    actions: Array<Action>;
    visits: number;
    wins: number;

    action: Action;

    findBestChild;

    constructor(state: MCTSGameState, parent?: MCTSNode, children: Array<MCTSNode> = []) {
        this.state = state;
        this.parent = parent || null;
        this.children = children || [];
        this.actions = [];

        this.visits = 0;
        this.wins = 0;

        this.findBestChild = findBestChildWithUCT(Math.sqrt(2));
    }

    addChildNodeFromState(childState: MCTSGameState): MCTSNode {
        const childNode = new MCTSNode(childState, this, []);
        this.children.push(childNode);
        return childNode;
    }

    selectMostPromisingNode(): MCTSNode {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let node = this;
        while (!node.state.isEndOfGame() && node.isFullyExpanded()) {
            node = this.findBestChild(node);
        }
        return node;
    }

    shuffle<T>(a: Array<T>): Array<T> {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    expand(): MCTSNode {
        if (this.actions.length === 0) {
            this.actions = this.state.getPossibleMoves();
            this.shuffle(this.actions);
        }
        if (this.isFullyExpanded()) {
            return null;
        }

        const actionToPerform = this.actions[this.children.length];
        const nextPlayer = this.state.getNextPlayer();
        const newState = this.state.applyAction({ move: actionToPerform, player: nextPlayer });
        const newNode = this.addChildNodeFromState(newState);
        newNode.action = actionToPerform;
        return newNode;
    }

    isFullyExpanded(): boolean {
        return this.children.length > 0 && this.children.length === this.actions.length;
    }

    getMostVisitedChild(): MCTSNode {
        const child = this.children.reduce((x, y) => {
            if (x.visits > y.visits) {
                return x;
            }

            return y;
        });

        return child;
    }

    simulate(): any {
        let state = this.state;
        let actionToApply;
        let actions;

        while (!state.isEndOfGame()) {
            actions = state.getPossibleMoves();
            actionToApply = actions[Math.floor(Math.random() * actions.length)];

            const nextPlayer = state.getNextPlayer();
            state = state.applyAction({ move: actionToApply, player: nextPlayer });
        }
        return state.getStatus();
    }

    backpropagate(result: any): void {
        this.visits++;

        if (result !== 'DRAW') {
            if (this.state.getPlayer() === result) {
                this.wins++;
            } else {
                this.wins--;
            }
        }
        if (this.parent !== null) {
            this.parent.backpropagate(result);
        }
    }
}
