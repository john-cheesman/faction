import Person from '../person';

export default class Merchant extends Person {
    constructor(private _merchantData: IMerchant) {
        super(_merchantData.personData);
    }

    get rateFactor(): number {
        return _merchantData.rateFactor;
    }
}
