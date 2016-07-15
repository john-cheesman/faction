import { EquipmentType } from '../enums/equipment-type';

export class Equipment {
    constructor(equipmentData) {
        this.head = equipmentData.head;
        this.body = equipmentData.body;
        this.primaryHand = equipmentData.primaryHand;
        this.secondaryHand = equipmentData.secondaryHand;
        this.feet = equipmentData.feet;
    }

    equipItem (item) {
        let previousItem;

        switch (item.equipmentType) {
            case EquipmentType.Head:
                previousItem = this.head;
                this.head = item;
                break;

            case EquipmentType.Body:
                previousItem = this.head;
                this.body = item;
                break;

            case EquipmentType.Feet:
                previousItem = this.feet;
                this.feet = item;
                break;

            case EquipmentType.OneHanded:
                if (!this.primaryHand || this.primaryHand.equipmentType === EquipmentType.OneHanded) {
                    previousItem = this.primaryHand;
                    this.primaryHand = item;
                }
                else if(this.primaryHand.equipmentType === EquipmentType.TwoHanded) {
                    return;
                }
                else {
                    previousItem = this.secondaryHand;
                    this.secondaryHand = item;
                }
                break;

            case EquipmentType.TwoHanded:
                if (this.primaryHand && this.primaryHand.equipmentType === EquipmentType.TwoHanded) {
                    return;
                }

                previousItem = this.secondaryHand;
                this.secondaryHand = item;
                break;
        }

        return previousItem;
    }
}
