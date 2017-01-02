import EquipmentData from './equipmentData';
import EquippableItem from './items/equippable-item';
import EquipmentType from '../enums/equipment-type';

export default class Equipment {
    private _equipment: EquipmentData;

    constructor(equipmentData: EquipmentData) {
        if (equipmentData) {
            this._equipment = equipmentData;
        }
    }

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

    // equipItem(item: EquippableItem) {
    //     let previousItem;

    //     if (item) {
    //         switch (item.equipmentType) {
    //             case 'Head':
    //                 previousItem = this.head;
    //                 this.head = item;
    //                 break;

    //             case 'Body':
    //                 previousItem = this.head;
    //                 this.body = item;
    //                 break;

    //             case 'Feet':
    //                 previousItem = this.feet;
    //                 this.feet = item;
    //                 break;

    //             case 'OneHanded':
    //                 if (!this.primaryHand) {
    //                     this.primaryHand = item;
    //                 }
    //                 else if (this.primaryHand.equipmentType === 'TwoHanded') {
    //                     return;
    //                 }
    //                 else {
    //                     previousItem = this.secondaryHand;
    //                     this.secondaryHand = item;
    //                 }
    //                 break;

    //             case 'TwoHanded':
    //                 if (this.primaryHand && this.primaryHand.equipmentType === 'TwoHanded') {
    //                     return;
    //                 }

    //                 previousItem = this.secondaryHand;
    //                 this.secondaryHand = item;
    //                 break;
    //         }
    //     }

    //     return previousItem;
    // }

    // unequipItem(itemType) {
    //     let previousItem;

    //     previousItem = this[itemType];
    //     this[itemType] = null;

    //     return previousItem;
    // }

    get combinedStats() {
        let stats,
            item;

        stats = {
            attack: 0,
            defence: 0,
            evasion: 0,
            accuracy: 0,
            speed: 0
        };

        for (item in this) {
            if (this.hasOwnProperty(item)) {
                if (this[item]) {
                    stats.attack += this[item].attack;
                    stats.defence += this[item].defence;
                    stats.evasion += this[item].evasion;
                    stats.accuracy += this[item].accuracy;
                    stats.speed += this[item].speed;
                }
            }
        }

        return stats;
    }
}
