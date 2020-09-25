import MCTSGameState from './MCTSGameState';
import MCTSNode from './MCTSNode';

export default class MCTS {
    findNextMove(state: MCTSGameState, player?: number): any {
        const rootNode = new MCTSNode(state);

        if (!player) {
            player = 1;
        }
        rootNode.state.setPlayer(3 - player);

        for (let iteration = 0; iteration < 100; iteration++) {
            // Select
            let nodeToExplore = rootNode.selectMostPromisingNode();
            // Expand
            if (!nodeToExplore.state.isEndOfGame() && !nodeToExplore.isFullyExpanded()) {
                nodeToExplore = nodeToExplore.expand();
            }
            // Simulate
            const result = nodeToExplore.simulate();

            // Backpropagate
            nodeToExplore.backpropagate(result);
        }
        console.log(rootNode);

        return rootNode.getMostVisitedChild().action;
    }
}
