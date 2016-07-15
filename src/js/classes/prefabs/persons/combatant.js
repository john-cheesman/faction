import { Person } from '../person';
import { Job } from '../../job';
import { Experience } from '../../experience';
import { EquipableItem } from '../../items/equipable-item';
import { equipableItems } from '../../../constants/equipable-items';

export class Combatant extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.xp = properties.xp;
        this.job = new Job(properties.job);
        this.weapon = new EquipableItem(equipableItems.dagger);

        console.log(`${this.name} xp: ${this.xp} job: ${this.job.name} level: ${this.level} xpForNextLevel: ${this.xpForNextLevel} strength: ${this.strength} vitality: ${this.vitality} agility: ${this.agility} intelligence: ${this.intelligence} hp: ${this.hp} attack: ${this.attack} defence: ${this.defence} evasion: ${this.evasion} accuracy: ${this.accuracy} speed: ${this.speed}`);
    }

    get level() {
        return Experience.getLevelForXP(this.xp);
    }

    get xpForNextLevel() {
        return Experience.getXPForLevel (this.level + 1);
    }

    get strength() {
        return this.level * ((this.job.strength * 25.5) / 99)
    }

    get vitality() {
        return this.level * ((this.job.vitality * 25.5) / 99)
    }

    get agility() {
        return this.level * ((this.job.agility * 25.5) / 99)
    }

    get intelligence() {
        return this.level * ((this.job.intelligence * 25.5) / 99)
    }

    get hp()
    {
        return this.vitality * 4;
    }

    get attack()
    {
        return this.strength;
    }

    get defence()
    {
        return (this.vitality + this.strength) / 2;
    }

    get evasion()
    {
        return (this.agility + this.intelligence) / 4;
    }

    get accuracy()
    {
        return (this.intelligence + this.vitality) / 2;
    }

    get speed()
    {
        return (this.agility + this.vitality) / 2;
    }
}
