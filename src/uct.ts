import MCTSNode from './MCTSNode';

const calculateValue = (explorationConst, totalVisits, nodeWinScore, nodeVisits) => {
    return nodeWinScore / nodeVisits + explorationConst * Math.sqrt(Math.log(totalVisits) / nodeVisits);
};

const findBestChildWithUCT = (explorationConst: number) => (node: MCTSNode): MCTSNode => {
    let maxUCB = -Number.MAX_VALUE;
    let bestNode = null;

    node.children.forEach((child) => {
        const ucb = calculateValue(explorationConst, node.visits, child.wins, child.visits);

        if (ucb > maxUCB) {
            maxUCB = ucb;
            bestNode = child;
        }
    });

    return bestNode;
};

export default findBestChildWithUCT;
