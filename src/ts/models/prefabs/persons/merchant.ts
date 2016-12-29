import Person from '../person';

export default class Merchant extends Person {
    constructor(name, x, y, properties, visible) {
        super(name, x, y, properties, visible);

        this.rateFactor = properties.rateFactor;
    }
}
