const _levelFactor = 0.04;

export default class Experience {
    static getLevelForXP(xp: number) {
        return Math.floor((Math.sqrt(xp * _levelFactor)));
    }

    static getXPForLevel(level: number) {
        return (Math.floor((Math.pow(level, 2)) / _levelFactor));
    }

    static getXPAwarded(winnerLevel: number, loserLevel: number) {
        return (((Math.pow(loserLevel, 1.5)) / winnerLevel) * _levelFactor) * 1000;
    }
}
