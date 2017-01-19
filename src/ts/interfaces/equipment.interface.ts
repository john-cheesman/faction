import IEquippableItem from './equippable-item.interface';

interface IEquipment {
    [index: string]: IEquippableItem,
    head: IEquippableItem,
    body: IEquippableItem,
    primaryHand: IEquippableItem,
    secondaryHand: IEquippableItem,
    feet: IEquippableItem
}

export default IEquipment
