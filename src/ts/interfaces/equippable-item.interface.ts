import IItem from './item.interface';
import EquipmentType from '../enums/equipment-type';

interface IEquippableItem {
    itemData: IItem,
    attack: number,
    defence: number,
    evasion: number,
    accuracy: number,
    speed: number,
    equipmentType: EquipmentType
}

export default IEquippableItem