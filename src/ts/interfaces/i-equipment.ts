import EquippableItem from '../models/items/equippable-item';

interface IEquipment {
    head: EquippableItem,
    body: EquippableItem,
    primaryHand: EquippableItem,
    secondaryHand: EquippableItem,
    feet: EquippableItem
}

export default IEquipment
