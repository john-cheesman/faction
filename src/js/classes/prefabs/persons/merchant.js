import { Person } from '../person';

export class Merchant extends Person {
    constructor(name, x, y, properties) {
        super(name, x, y, properties);

        this.rateFactor = properties.rateFactor;
    }
}
