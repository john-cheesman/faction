import { EquipmentType } from '../enums/equipment-type';

export const equippableItems = {
    dagger: {
        id: 'dagger',
        name: 'Dagger',
        description: 'A short double-bladed knife',
        baseValue: 20,
        equipmentType: EquipmentType.OneHanded,
        attack: 10,
        accuracy: 0,
        defence: 0,
        evasion: 0,
        speed: 0
    },
    woodenShield: {
        id: 'woodenShield',
        name: 'Wooden Shield',
        description: 'A lightweight wooden shield',
        baseValue: 30,
        equipmentType: EquipmentType.OneHanded,
        attack: 0,
        accuracy: 0,
        defence: 20,
        evasion: 0,
        speed: -10
    }
};
