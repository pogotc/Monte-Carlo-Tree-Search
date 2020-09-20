import MCTSGameState from './MCTSGameState';
import MCTSNode from './MCTSNode';

export default class MCTS {
    findNextMove(state: MCTSGameState): any {
        const rootNode = new MCTSNode(state);

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

        return rootNode.getMostVisitedChild().action;
    }
}
