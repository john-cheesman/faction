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
    private _equipment: Equipment;
    private _baseStats: Stats;

    constructor(private _combatantData: ICombatant) {
        super(_combatantData.personData);

        this._equipment = new Equipment(_combatantData.equipment);
        this._baseStats = new Stats(_combatantData.baseStats);

        console.log(`${this.name} xp: ${this.xp} baseStats: ${this._baseStats} level: ${this.level} xpForNextLevel: ${this.xpForNextLevel} strength: ${this.strength} vitality: ${this.vitality} agility: ${this.agility} intelligence: ${this.intelligence} hp: ${this.hp} attack: ${this.attack} defence: ${this.defence} evasion: ${this.evasion} accuracy: ${this.accuracy} speed: ${this.speed} equipment: ${this.equipment}`);

        console.log(EquipmentHelper.getAggregateStats(this.equipment));

        //console.log(EquipmentHelper.equipItem(EquippableItem.instantiateFromString('dagger')));

        console.log(EquipmentHelper.unequipItem('secondaryHand', this.equipment));
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
        return this.level * ((this._baseStats.strength * 25.5) / 99);
    }

    get vitality(): number {
        return this.level * ((this._baseStats.vitality * 25.5) / 99);
    }

    get agility(): number {
        return this.level * ((this._baseStats.agility * 25.5) / 99);
    }

    get intelligence(): number {
        return this.level * ((this._baseStats.intelligence * 25.5) / 99);
    }

    get hp(): number {
        return this.vitality * 4;
    }

    get attack(): number {
        return this.strength + this.equipmentStats.attack;
    }

    get defence(): number {
        return ((this.vitality + this.strength) / 2) + this.equipmentStats.defence;
    }

    get evasion(): number {
        return ((this.agility + this.intelligence) / 4) + this.equipmentStats.evasion;
    }

    get accuracy(): number {
        return ((this.intelligence + this.vitality) / 2) + this.equipmentStats.accuracy;
    }

    get speed(): number {
        return ((this.agility + this.vitality) / 2) + this.equipmentStats.speed;
    }

    get equipment(): Equipment {
        return this._equipment;
    }

    get equipmentStats(): DerivedStats {
        return EquipmentHelper.getAggregateStats(this._equipment);
    }
}
