import EquipmentType from '../enums/equipment-type';
export default class EquippableItemData {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public baseValue: number,
        public attack: number,
        public defence: number,
        public evasion: number,
        public accuracy: number,
        public speed: number,
        public equipmentType: EquipmentType
    ) { }
}
