import EquippableItemData from '../equippable-item-data';
import EquipmentType from '../../enums/equipment-type';
import Item from '../item';
import { equippableItems } from '../../constants/equippable-items';

export default class EquippableItem extends Item {
    private _equippableItemData: EquippableItemData;

    constructor(equippableItemData: EquippableItemData) {
        super(
            equippableItemData.itemData.id,
            equippableItemData.itemData.name,
            equippableItemData.itemData.description,
            equippableItemData.itemData.baseValue);

        this._equippableItemData = equippableItemData;
    }

    public isEquipped: boolean = false;

    get equipmentType(): EquipmentType {
        return this._equippableItemData.equipmentType;
    }

    static instantiateFromString(type: string) {
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
