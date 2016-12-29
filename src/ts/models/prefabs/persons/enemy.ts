import Person from '../person';

export default class Enemy extends Person {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.battle = properties.battle;
    }

    interact() {
        this.gameState.game.state.start('Boot', true, false, `data/battle/${this.battle}-data.json`, 'Battle');
    }
}
