const _levelFactor = 0.04;

export class Experience {
    static getLevelForXP (xp) {
        return parseInt(Math.floor((Math.sqrt(xp * _levelFactor))), 10);
    }

    static getXPForLevel (level) {
        return parseInt((Math.floor((Math.pow(level, 2)) / _levelFactor)), 10);
    }

    static getXPAwarded(winnerLevel, loserLevel)
    {
        return parseInt((((Math.pow(loserLevel, 1.5)) / winnerLevel) * _levelFactor) * 1000, 10);
    }
}
