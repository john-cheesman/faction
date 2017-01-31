import Stats from '../../stats';
import DerivedStats from '../../derived-stats';
import EquipmentHelper from '../../../helpers/equipment.helper';
import ICombatant from '../../../interfaces/combatant.interface';
import IPerson from '../../../interfaces/person.interface';
import Person from '../person';
import Job from '../../job';
import Experience from '../../experience';
import EquippableItem from '../../items/equippable-item';
import Equipment from '../../equipment';
import equippableItems from '../../../constants/equippable-items';

export default class Combatant extends Person {
    constructor(public combatantData: ICombatant) {
        super(combatantData.personData);

        this.equipment = new Equipment(combatantData.equipment);
        this.baseStats = new Stats(combatantData.baseStats);

        console.log(`${this.name} xp: ${this.xp} baseStats: ${this.baseStats} level: ${this.level} xpForNextLevel: ${this.xpForNextLevel} strength: ${this.strength} vitality: ${this.vitality} agility: ${this.agility} intelligence: ${this.intelligence} hp: ${this.hp} attack: ${this.attack} defence: ${this.defence} evasion: ${this.evasion} accuracy: ${this.accuracy} speed: ${this.speed} equipment: ${this.equipment}`);

        console.log(EquipmentHelper.getAggregateStats(this.equipment));

        //console.log(EquipmentHelper.equipItem(EquippableItem.instantiateFromString('dagger')));

        console.log(EquipmentHelper.unequipItem('secondaryHand', this.equipment));
    }

    public equipment: Equipment;
    public baseStats: Stats;

    get xp() {
        return this.combatantData.xp;
    }

    get level() {
        return Experience.getLevelForXP(this.xp);
    }

    get xpForNextLevel() {
        return Experience.getXPForLevel(this.level + 1);
    }

    get strength() {
        return this.level * ((this.baseStats.strength * 25.5) / 99);
    }

    get vitality() {
        return this.level * ((this.baseStats.vitality * 25.5) / 99);
    }

    get agility() {
        return this.level * ((this.baseStats.agility * 25.5) / 99);
    }

    get intelligence() {
        return this.level * ((this.baseStats.intelligence * 25.5) / 99);
    }

    get hp() {
        return this.vitality * 4;
    }

    get attack() {
        return this.strength + this.equipmentStats.attack;
    }

    get defence() {
        return ((this.vitality + this.strength) / 2) + this.equipmentStats.defence;
    }

    get evasion() {
        return ((this.agility + this.intelligence) / 4) + this.equipmentStats.evasion;
    }

    get accuracy() {
        return ((this.intelligence + this.vitality) / 2) + this.equipmentStats.accuracy;
    }

    get speed() {
        return ((this.agility + this.vitality) / 2) + this.equipmentStats.speed;
    }

    get equipmentStats() {
        return EquipmentHelper.getAggregateStats(this.equipment);
    }
}
