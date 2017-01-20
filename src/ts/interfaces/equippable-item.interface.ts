import IDerivedStats from './derived-stats.interface';
import IItem from './item.interface';
import EquipmentType from '../enums/equipment-type';

interface IEquippableItem {
    itemData: IItem,
    derivedStats: IDerivedStats,
    equipmentType: EquipmentType
}

export default IEquippableItem
