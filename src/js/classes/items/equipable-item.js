import { Item } from '../item';

export class EquipableItem extends Item {
    constructor(equipmentData) {
        super(equipmentData.name, equipmentData.description, equipmentData.baseValue);

        this.equipmentType = equipmentData.equipmentType;
        this.strength = equipmentData.strength;
        this.vitality = equipmentData.vitality;
        this.agility = equipmentData.agility;
        this.intelligence = equipmentData.intelligence;
        this.attack = equipmentData.attack;
        this.defence = equipmentData.defence;
        this.evasion = equipmentData.evasion;
        this.accuracy = equipmentData.accuracy;
        this.speed = equipmentData.speed;
    }
}
