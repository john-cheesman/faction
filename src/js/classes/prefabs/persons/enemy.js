import { Person } from '../person';

export class Enemy extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.partyData = properties.partyData;
    }
}
