import IEquipment from '../interfaces/equipment.interface';
import EquippableItem from './items/equippable-item.item';
import EquipmentType from '../enums/equipment-type';
import DerivedStats from './derived-stats';
import IDerivedStats from '../interfaces/derived-stats.interface';

export default class Equipment {
    constructor(private _equipment?: IEquipment) { }

    get head(): EquippableItem {
        return this._equipment.head;
    }

    set head(value) {
        this._equipment.head = value;
    }

    get body(): EquippableItem {
        return this._equipment.body;
    }

    set body(value) {
        this._equipment.body = value;
    }

    get primaryHand(): EquippableItem {
        return this._equipment.primaryHand;
    }

    set primaryHand(value) {
        if (value.equipmentType === 'OneHanded' || (value.equipmentType === 'TwoHanded' && this.secondaryHand === null)) {
            this._equipment.primaryHand = value;
        }
    }

    get secondaryHand(): EquippableItem {
        return this._equipment.secondaryHand;
    }

    set secondaryHand(value) {
        if (value.equipmentType === 'OneHanded' && this.primaryHand !== null && this.primaryHand.equipmentType !== 'TwoHanded') {
            this._equipment.secondaryHand = value;
        }
    }

    get feet(): EquippableItem {
        return this._equipment.feet;
    }

    set feet(value) {
        this._equipment.feet = value;
    }

    equipItem(item: EquippableItem): EquippableItem {
        let previousItem;

        if (item) {
            switch (item.equipmentType) {
                case 'Head':
                    previousItem = this.head;
                    this.head = item;
                    break;

                case 'Body':
                    previousItem = this.head;
                    this.body = item;
                    break;

                case 'Feet':
                    previousItem = this.feet;
                    this.feet = item;
                    break;

                case 'OneHanded':
                    if (!this.primaryHand) {
                        this.primaryHand = item;
                    }
                    else if (this.primaryHand.equipmentType === 'TwoHanded') {
                        return;
                    }
                    else {
                        previousItem = this.secondaryHand;
                        this.secondaryHand = item;
                    }
                    break;

                case 'TwoHanded':
                    if (this.primaryHand && this.primaryHand.equipmentType === 'TwoHanded') {
                        return;
                    }

                    previousItem = this.secondaryHand;
                    this.secondaryHand = item;
                    break;
            }
        }

        return previousItem;
    }

    unequipItem(itemType: string): EquippableItem {
        let previousItem: EquippableItem;

        previousItem = this._equipment[itemType];
        this._equipment[itemType] = null;

        return previousItem;
    }

    get combinedStats(): DerivedStats {
        let statsData: IDerivedStats,
            item: string;

        statsData = {
            attack: 0,
            defence: 0,
            evasion: 0,
            accuracy: 0,
            speed: 0
        };

        for (item in this._equipment) {
            if (this.hasOwnProperty(item)) {
                if (this[item]) {
                    statsData.attack += this[item].attack;
                    statsData.defence += this[item].defence;
                    statsData.evasion += this[item].evasion;
                    statsData.accuracy += this[item].accuracy;
                    statsData.speed += this[item].speed;
                }
            }
        }

        return new DerivedStats(statsData);
    }
}
