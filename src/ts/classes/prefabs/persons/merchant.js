import { Person } from '../person';

export class Merchant extends Person {
    constructor(name, x, y, properties, visible) {
        super(name, x, y, properties, visible);

        this.rateFactor = properties.rateFactor;
    }
}
