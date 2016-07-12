import { Person } from '../person';
import { Job } from '../../job';
import { Experience } from '../../experience';
import { Stats } from '../../stats';

export class Combatant extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.xp = properties.xp;
        this.level = null;
        this.xpForNextLevel = null;
        this.currentStats = null;
        this.job = new Job(properties.job);

        this.updateStats();
    }

    updateStats () {
        this.level = Experience.getLevelForXP (this.xp);
        this.xpForNextLevel = Experience.getXPForLevel (this.level + 1);
        this.currentStats = Stats.calculateCurrentStats (this.job.stats, this.level);
    }
}
