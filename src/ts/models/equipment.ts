import IEquipment from '../interfaces/equipment.interface';
import IEquippableItem from '../interfaces/equippable-item.interface';
import EquippableItem from './items/equippable-item.item';
import EquipmentType from '../enums/equipment-type';
import DerivedStats from './derived-stats';
import IDerivedStats from '../interfaces/derived-stats.interface';

export default class Equipment {
    private _head: EquippableItem;
    private _body: EquippableItem;
    private _primaryHand: EquippableItem;
    private _secondaryHand: EquippableItem;
    private _feet: EquippableItem;

    constructor(_equipment?: IEquipment) { }

    get head() {
        return this._head;
    }

    set head(value) {
        this._head = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get primaryHand() {
        return this._primaryHand;
    }

    set primaryHand(value) {
        if (value.equipmentType === 'OneHanded' || (value.equipmentType === 'TwoHanded' && this.secondaryHand === null)) {
            this._primaryHand = value;
        }
    }

    get secondaryHand() {
        return this._secondaryHand;
    }

    set secondaryHand(value) {
        if (value.equipmentType === 'OneHanded' && this.primaryHand !== null && this.primaryHand.equipmentType !== 'TwoHanded') {
            this._secondaryHand = value;
        }
    }

    get feet() {
        return this._feet;
    }

    set feet(value) {
        this._feet = value;
    }

    equipItem(item: EquippableItem): EquippableItem {
        let previousItem: EquippableItem;

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

    // unequipItem(itemType: string): EquippableItem {
    //     let previousItem: EquippableItem;

    //     previousItem = this._equipment[itemType];
    //     this._equipment[itemType] = null;

    //     return previousItem;
    // }

    // get combinedStats(): DerivedStats {
    //     let statsData: IDerivedStats;

    //     statsData = {
    //         attack: 0,
    //         defence: 0,
    //         evasion: 0,
    //         accuracy: 0,
    //         speed: 0
    //     };

    //     for (let item in this) {
    //         if (this.hasOwnProperty(item)) {
    //             if (this[item]) {
    //                 statsData.attack += this[item].attack;
    //                 statsData.defence += this[item].defence;
    //                 statsData.evasion += this[item].evasion;
    //                 statsData.accuracy += this[item].accuracy;
    //                 statsData.speed += this[item].speed;
    //             }
    //         }
    //     }

    //     return new DerivedStats(statsData);
    // }
}
