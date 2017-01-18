import IStats from '../interfaces/stats.interface';

export default class Stats {
    constructor(private _statsData: IStats) { }

    get strength(): number {
        return this._statsData.strength;
    }

    get vitality(): number {
        return this._statsData.vitality;
    }

    get agility(): number {
        return this._statsData.agility;
    }

    get intelligence(): number {
        return this._statsData.intelligence;
    }
}
