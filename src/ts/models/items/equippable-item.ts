import DerivedStats from '../derived-stats';
import EquippableItemData from '../../interfaces/equippable-item.interface';
import EquipmentType from '../../enums/equipment-type';
import Item from '../item';
import equippableItems from '../../constants/equippable-items';

export default class EquippableItem extends Item {
    private _equippableItemData: EquippableItemData;

    constructor(equippableItemData: EquippableItemData) {
        super(equippableItemData.itemData);

        this._equippableItemData = equippableItemData;
    }

    public isEquipped: boolean = false;

    get equipmentType(): EquipmentType {
        return this._equippableItemData.equipmentType;
    }

    get derivedStats(): DerivedStats {
        return new DerivedStats(this._equippableItemData.derivedStats);
    }

    // static instantiateFromString(type: string) {
    //     let itemData;

    //     itemData = equippableItems[type];

    //     if (itemData) {
    //         return new EquippableItem(itemData);
    //     }
    //     else if (type) {
    //         console.error(`Unknown equippable item: ${type}`);
    //     }

    //     return null;
    // }
}