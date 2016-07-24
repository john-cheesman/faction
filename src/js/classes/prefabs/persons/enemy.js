import { Person } from '../person';

export class Enemy extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.battle = properties.battle;
    }

    interact() {
        this.gameState.game.state.start('Boot', true, false, `data/battle/${this.battle}-data.json`, 'Battle');
    }
}
