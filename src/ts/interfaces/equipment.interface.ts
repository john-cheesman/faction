import EquippableItem from '../models/items/equippable-item.item';

interface IEquipment {
    [index: string]: EquippableItem,
    head: EquippableItem,
    body: EquippableItem,
    primaryHand: EquippableItem,
    secondaryHand: EquippableItem,
    feet: EquippableItem
}

export default IEquipment
