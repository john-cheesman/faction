import Item from '../item';
import { equippableItems } from '../../constants/equippable-items';

export default class EquippableItem extends Item {
    constructor(equipmentData) {
        super(equipmentData.id, equipmentData.name, equipmentData.description, equipmentData.baseValue);

        this.equipmentType = equipmentData.equipmentType;
        this.isEquipped = false;
        this.attack = equipmentData.attack;
        this.defence = equipmentData.defence;
        this.evasion = equipmentData.evasion;
        this.accuracy = equipmentData.accuracy;
        this.speed = equipmentData.speed;
    }

    static instantiateFromString(type) {
        let itemData;

        itemData = equippableItems[type];

        if (itemData) {
            return new EquippableItem(itemData);
        }
        else if (type) {
            console.error(`Unknown equippable item: ${type}`);
        }

        return null;
    }
}
