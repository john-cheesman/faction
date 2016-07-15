import { EquipmentType } from '../enums/equipment-type';

export const equipableItems = {
    dagger: {
        name: 'Dagger',
        description: 'A short double-bladed knife',
        basevalue: 20,
        equipmentType: EquipmentType.OneHanded,
        attack: 10,
        accuracy: 10
    }
};
