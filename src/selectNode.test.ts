import selectNode from './selectNode';
import MCTSNode from './MCTSNode';
import { TestGameState } from './testHelper';

describe('Select Node Function', () => {
    test('Will return the current node - for now', () => {
        const rootNode = new MCTSNode(new TestGameState([1], 1));

        expect(selectNode(rootNode)).toEqual(rootNode);
    });
});
