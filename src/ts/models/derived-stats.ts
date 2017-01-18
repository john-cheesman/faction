import IStats from '../interfaces/derived-stats.interface';

export default class DerivedStats {
    constructor(private _derivedStatsData: IStats) { }

    get attack(): number {
        return this._derivedStatsData.attack;
    }

    get defence(): number {
        return this._derivedStatsData.defence;
    }

    get evasion(): number {
        return this._derivedStatsData.evasion;
    }

    get accuracy(): number {
        return this._derivedStatsData.accuracy;
    }

    get speed(): number {
        return this._derivedStatsData.speed;
    }
}
