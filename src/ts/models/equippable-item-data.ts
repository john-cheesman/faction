import ItemData from './item-data';
import EquipmentType from '../enums/equipment-type';

export default class EquippableItemData {
    constructor(
        public itemData: ItemData,
        public attack: number,
        public defence: number,
        public evasion: number,
        public accuracy: number,
        public speed: number,
        public equipmentType: EquipmentType
    ) { }
}
