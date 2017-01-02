import EquippableItem from './items/equippable-item';
export default class EquipmentData {
    constructor(
        public head: EquippableItem,
        public body: EquippableItem,
        public primaryHand: EquippableItem,
        public secondaryHand: EquippableItem,
        public feet: EquippableItem) {}
}
