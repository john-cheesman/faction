import { Person } from '../person';
import { Job } from '../../job';
import { Experience } from '../../experience';
import { EquippableItem } from '../../items/equippable-item';
import { Equipment } from '../../equipment';
import { equippableItems } from '../../../constants/equippable-items';

export class Combatant extends Person {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.xp = properties.xp;
        this.job = new Job(properties.job);
        this.equipment = new Equipment();
        this.equipmentList = properties.equipment;

        if (properties.equipment) {
            this.equipment.equipItem(EquippableItem.instantiateFromString(properties.equipment.head));
            this.equipment.equipItem(EquippableItem.instantiateFromString(properties.equipment.body));
            this.equipment.equipItem(EquippableItem.instantiateFromString(properties.equipment.primaryHand));
            this.equipment.equipItem(EquippableItem.instantiateFromString(properties.equipment.secondaryHand));
            this.equipment.equipItem(EquippableItem.instantiateFromString(properties.equipment.feet));
        }

        console.log(`${this.name} xp: ${this.xp} job: ${this.job.name} level: ${this.level} xpForNextLevel: ${this.xpForNextLevel} strength: ${this.strength} vitality: ${this.vitality} agility: ${this.agility} intelligence: ${this.intelligence} hp: ${this.hp} attack: ${this.attack} defence: ${this.defence} evasion: ${this.evasion} accuracy: ${this.accuracy} speed: ${this.speed} equipment:`, this.equipment);

        console.log(this.equipment.combinedStats);

        console.log(this.equipment.equipItem(EquippableItem.instantiateFromString('dagger')));

        console.log(this.equipment.unequipItem('secondaryHand'));
    }

    get level() {
        return Experience.getLevelForXP(this.xp);
    }

    get xpForNextLevel() {
        return Experience.getXPForLevel (this.level + 1);
    }

    get strength() {
        return this.level * ((this.job.strength * 25.5) / 99);
    }

    get vitality() {
        return this.level * ((this.job.vitality * 25.5) / 99);
    }

    get agility() {
        return this.level * ((this.job.agility * 25.5) / 99);
    }

    get intelligence() {
        return this.level * ((this.job.intelligence * 25.5) / 99);
    }

    get hp()
    {
        return this.vitality * 4;
    }

    get attack()
    {
        return this.strength + this.equipment.combinedStats.attack;
    }

    get defence()
    {
        return ((this.vitality + this.strength) / 2) + this.equipment.combinedStats.defence;
    }

    get evasion()
    {
        return ((this.agility + this.intelligence) / 4) + this.equipment.combinedStats.evasion;
    }

    get accuracy()
    {
        return ((this.intelligence + this.vitality) / 2) + this.equipment.combinedStats.accuracy;
    }

    get speed()
    {
        return ((this.agility + this.vitality) / 2) + this.equipment.combinedStats.speed;
    }
}
