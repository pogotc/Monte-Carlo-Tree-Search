import { TestGameState } from './testHelper';

describe('MCTSGameState', () => {
    test('Initialisation', () => {
        const gameState = new TestGameState([0, 0, 0], 1);
        expect(gameState.getBoard()).toEqual([0, 0, 0]);
        expect(gameState.getPlayer()).toEqual(1);
    });
});
