import IDerivedStats from '../interfaces/derived-stats.interface';

export default class DerivedStats {
    private _attack: number;
    private _defence: number;
    private _evasion: number;
    private _accuracy: number;
    private _speed: number;

    constructor(_derivedStatsData: IDerivedStats) {
        for (let stat in _derivedStatsData) {
            if (Object.hasOwnProperty(stat)) {
                this[`_${stat}`] = _derivedStatsData[stat];
            }
        }
    }

    [index: string]: number;

    get attack(): number {
        return this._attack;
    }

    get defence(): number {
        return this._defence;
    }

    get evasion(): number {
        return this._evasion;
    }

    get accuracy(): number {
        return this._accuracy;
    }

    get speed(): number {
        return this._speed;
    }
}
