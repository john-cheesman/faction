import IEquipment from '../interfaces/equipment.interface';
import IEquippableItem from '../interfaces/equippable-item.interface';
import EquippableItem from './items/equippable-item';
import EquipmentType from '../enums/equipment-type';
import DerivedStats from './derived-stats';
import IDerivedStats from '../interfaces/derived-stats.interface';

export default class Equipment {
    private _head: EquippableItem;
    private _body: EquippableItem;
    private _primaryHand: EquippableItem;
    private _secondaryHand: EquippableItem;
    private _feet: EquippableItem;

    constructor(_equipment?: IEquipment) {
        for (let item in _equipment) {
            if (Object.hasOwnProperty(item)) {
                this[`_${item}`] = new EquippableItem(_equipment[item]);
            }
        }
    }

    [index: string]: EquippableItem;

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
}
