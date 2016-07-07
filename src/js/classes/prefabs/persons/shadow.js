import { Person } from '../person';
import { Stats } from '../../stats';

export class Shadow extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.stats = new Stats({
            strength: 7,
            vitality: 6,
            agility: 9,
            intelligence: 8
        });

        this.updateStats();
    }
}
