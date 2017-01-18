import ICombatant from '../../../interfaces/combatant.interface';
import IPerson from '../../../interfaces/person.interface';
import Person from '../person';
import Job from '../../job';
import Experience from '../../experience';
import EquippableItem from '../../items/equippable-item.item';
import Equipment from '../../equipment';
import equippableItems from '../../../constants/equippable-items';

export default class Combatant extends Person {
    private _equipment: Equipment;
    private _job: Job;

    constructor(private _combatantData: ICombatant) {
        super(_combatantData.personData);

        this._job = new Job(_combatantData.job);
        this._equipment = new Equipment(_combatantData.equipment);

        console.log(`${this.name} xp: ${this.xp} job: ${this.job.name} level: ${this.level} xpForNextLevel: ${this.xpForNextLevel} strength: ${this.strength} vitality: ${this.vitality} agility: ${this.agility} intelligence: ${this.intelligence} hp: ${this.hp} attack: ${this.attack} defence: ${this.defence} evasion: ${this.evasion} accuracy: ${this.accuracy} speed: ${this.speed} equipment:`, this.equipment);

        console.log(this.equipment.combinedStats);

        console.log(this.equipment.equipItem(EquippableItem.instantiateFromString('dagger')));

        console.log(this.equipment.unequipItem('secondaryHand'));
    }

    get xp(): number {
        return this._combatantData.xp;
    }

    get level(): number {
        return Experience.getLevelForXP(this.xp);
    }

    get xpForNextLevel(): number {
        return Experience.getXPForLevel(this.level + 1);
    }

    get strength(): number {
        return this.level * ((this.job.strength * 25.5) / 99);
    }

    get vitality(): number {
        return this.level * ((this.job.vitality * 25.5) / 99);
    }

    get agility(): number {
        return this.level * ((this.job.agility * 25.5) / 99);
    }

    get intelligence(): number {
        return this.level * ((this.job.intelligence * 25.5) / 99);
    }

    get hp(): number {
        return this.vitality * 4;
    }

    get attack(): number {
        return this.strength + this.equipment.combinedStats.attack;
    }

    get defence(): number {
        return ((this.vitality + this.strength) / 2) + this.equipment.combinedStats.defence;
    }

    get evasion(): number {
        return ((this.agility + this.intelligence) / 4) + this.equipment.combinedStats.evasion;
    }

    get accuracy(): number {
        return ((this.intelligence + this.vitality) / 2) + this.equipment.combinedStats.accuracy;
    }

    get speed(): number {
        return ((this.agility + this.vitality) / 2) + this.equipment.combinedStats.speed;
    }

    get equipment(): Equipment {
        return this._equipment;
    }

    get job(): Job {
        return this._job;
    }
}
