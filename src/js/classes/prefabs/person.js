import { Prefab } from '../prefab';
import { Job } from '../job';
import { Experience } from '../experience';
import { Stats } from '../stats';
import { frames } from '../../config';

export class Person extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.direction = properties.direction || 'down';
        this.xp = properties.xp;
        this.level = null;
        this.xpForNextLevel = null;
        this.currentStats = null;
        this.job = new Job(properties.job);

        this.frame = frames.person[this.direction];

        this.body.setSize(28, 32, 4, 8);

        this.updateStats();
    }

    enableInteraction(player, person) {
        player.interactionTarget = person;
    }

    interact() {
        console.log('yo');
    }

    updateStats () {
        this.level = Experience.getLevelForXP (this.xp);
        this.xpForNextLevel = Experience.getXPForLevel (this.level + 1);
        this.currentStats = Stats.calculateCurrentStats (this.job.stats, this.level);
    }
}
