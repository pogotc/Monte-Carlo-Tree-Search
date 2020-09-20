import MCTSNode from './MCTSNode';
import { Move } from './MCTSGameState';
import { TestGameState, ThreeInARowGameState } from './testHelper';

class OneActionTestGameState extends TestGameState {
    getPossibleMoves(): Array<Move> {
        return [0];
    }
}

class TwoActionTestGameState extends TestGameState {
    getPossibleMoves(): Array<Move> {
        return [0, 1];
    }
}

describe('MCTSNode', () => {
    describe('Basic node operations', () => {
        let rootNode: MCTSNode;
        beforeEach(() => {
            const gameState = new TestGameState([0, 0, 0], 1);
            rootNode = new MCTSNode(gameState, null, []);
        });

        test('Creating a new instance of a node', () => {
            expect(rootNode.state.getBoard()).toEqual([0, 0, 0]);
            expect(rootNode.parent).toEqual(null);
            expect(rootNode.children).toHaveLength(0);
        });

        test('Appending child nodes', () => {
            const childState = new TestGameState([1, 0, 0], 2);

            expect(rootNode.children).toHaveLength(0);
            const childNode = rootNode.addChildNodeFromState(childState);
            expect(rootNode.children).toHaveLength(1);
            expect(childNode.parent).toEqual(rootNode);
        });

        test('Appending many child nodes and traversing back up', () => {
            let childNode = rootNode;

            for (let depth = 0; depth < 100; depth++) {
                const childState = new TestGameState([depth, 0, depth], 1);
                childNode = childNode.addChildNodeFromState(childState);
            }
            expect(childNode.state.getBoard()).toEqual([99, 0, 99]);

            while (childNode.parent !== null) {
                childNode = childNode.parent;
            }
            expect(childNode).toEqual(rootNode);
            expect(childNode.state.getBoard()).toEqual([0, 0, 0]);
        });
    });

    describe('Selecting a promising node to explore', () => {
        test('Will initially choose the root node to explore', () => {
            const gameState = new TestGameState([0, 0, 0], 1);
            const rootNode = new MCTSNode(gameState, null, []);

            expect(rootNode.selectMostPromisingNode()).toEqual(rootNode);
        });

        test('Will use the UCT function to select child nodes after fully expanding the root node', () => {
            // const gameState = new TwoActionTestGameState([0, 0, 0], 1);
            // const rootNode = new MCTSNode(gameState, null, []);
            // test me
        });
    });

    describe('Expanding a node', () => {
        let rootNode: MCTSNode;

        test('Will return a new node from the next available action', () => {
            const gameState = new OneActionTestGameState([0, 0, 0], 1);
            rootNode = new MCTSNode(gameState, null, []);
            expect(rootNode.children.length).toEqual(0);

            const childNode = rootNode.expand();
            expect(childNode.state.getBoard()).toEqual([2, 0, 0]);
            expect(childNode.parent).toEqual(rootNode);
            expect(childNode.state.getPlayer()).toEqual(2);
            expect(rootNode.children.length).toEqual(1);
        });

        test('Can keep expanding until the node has been fully expanded', () => {
            const gameState = new TwoActionTestGameState([0, 0, 0], 1);
            rootNode = new MCTSNode(gameState, null, []);

            const firstChild = rootNode.expand();
            expect(firstChild.state.getBoard()).toEqual([2, 0, 0]);
            expect(firstChild.state.getPlayer()).toEqual(2);

            const secondChild = rootNode.expand();
            expect(secondChild.state.getBoard()).toEqual([0, 2, 0]);
            expect(secondChild.state.getPlayer()).toEqual(2);

            const failedExpansion = rootNode.expand();
            expect(failedExpansion).toEqual(null);
        });
    });

    describe('Simulating playthrough from a node', () => {
        const gameState = new ThreeInARowGameState([0, 0, 0, 0, 0, 0, 0, 0, 0], 1);
        const rootNode = new MCTSNode(gameState, null, []);
        rootNode.simulate();
        // Todo - figure out how to test this.
    });

    describe('Backpropagation', () => {
        test('Nodes start off with visitor and win counts set to 0', () => {
            const gameState = new TestGameState([0, 0, 0], 1);
            const rootNode = new MCTSNode(gameState, null, []);

            expect(rootNode.visits).toEqual(0);
            expect(rootNode.wins).toEqual(0);
        });

        test('Win counts and visitor counts are set for the current node', () => {
            const gameState = new TestGameState([0, 0, 0], 1);
            const rootNode = new MCTSNode(gameState, null, []);

            rootNode.backpropagate(1);
            expect(rootNode.visits).toEqual(1);
            expect(rootNode.wins).toEqual(1);
        });

        test('Will not increase the win count if the node did not win', () => {
            const gameState = new TestGameState([0, 0, 0], 1);
            const rootNode = new MCTSNode(gameState, null, []);

            rootNode.backpropagate(2);
            expect(rootNode.visits).toEqual(1);
            expect(rootNode.wins).toEqual(0);
        });

        test('Can propagate the result back up the tree', () => {
            const gameState = new TestGameState([0, 0, 0], 1);
            const rootNode = new MCTSNode(gameState, null, []);

            const childState = new TestGameState([1, 0, 0], 2);
            const childNode = rootNode.addChildNodeFromState(childState);

            const grandChildState = new TestGameState([1, 2, 0], 1);
            const grandChildNode = childNode.addChildNodeFromState(grandChildState);

            const finalState = new TestGameState([1, 2, 1], 2);
            const finalNode = grandChildNode.addChildNodeFromState(finalState);

            // First propagation
            finalNode.backpropagate(1);

            expect(rootNode.visits).toEqual(1);
            expect(rootNode.wins).toEqual(1);

            expect(childNode.visits).toEqual(1);
            expect(childNode.wins).toEqual(0);

            expect(grandChildNode.visits).toEqual(1);
            expect(grandChildNode.wins).toEqual(1);

            expect(finalNode.visits).toEqual(1);
            expect(finalNode.wins).toEqual(0);

            // Second propagation
            finalNode.backpropagate(1);

            expect(rootNode.visits).toEqual(2);
            expect(rootNode.wins).toEqual(2);

            expect(childNode.visits).toEqual(2);
            expect(childNode.wins).toEqual(0);

            expect(grandChildNode.visits).toEqual(2);
            expect(grandChildNode.wins).toEqual(2);

            expect(finalNode.visits).toEqual(2);
            expect(finalNode.wins).toEqual(0);

            // Third propagation - player 2 wins this time
            finalNode.backpropagate(2);

            expect(rootNode.visits).toEqual(3);
            expect(rootNode.wins).toEqual(2);

            expect(childNode.visits).toEqual(3);
            expect(childNode.wins).toEqual(1);

            expect(grandChildNode.visits).toEqual(3);
            expect(grandChildNode.wins).toEqual(2);

            expect(finalNode.visits).toEqual(3);
            expect(finalNode.wins).toEqual(1);
        });
    });
});
