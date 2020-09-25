import MCTSGameState from './MCTSGameState';
import MCTSNode from './MCTSNode';

export default class MCTS {
    findNextMove(state: MCTSGameState, player: number): any {
        const rootNode = new MCTSNode(state);
        rootNode.state.setPlayer(3 - player);

        for (let iteration = 0; iteration < 200; iteration++) {
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
