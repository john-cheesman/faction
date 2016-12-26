import { EquipmentType } from '../enums/equipment-type';

export class Equipment {
    constructor(equipmentData) {
        if (equipmentData) {
            this.head = equipmentData.head;
            this.body = equipmentData.body;
            this.primaryHand = equipmentData.primaryHand;
            this.secondaryHand = equipmentData.secondaryHand;
            this.feet = equipmentData.feet;
        }
    }

    equipItem (item) {
        let previousItem;

        if (item) {
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
                    if (!this.primaryHand) {
                        this.primaryHand = item;
                    }
                    else if (this.primaryHand.equipmentType === EquipmentType.TwoHanded) {
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
        }

        return previousItem;
    }

    unequipItem (itemType) {
        let previousItem;

        previousItem = this[itemType];
        this[itemType] = null;

        return previousItem;
    }

    get combinedStats() {
        let stats,
            item;

        stats = {
            attack: 0,
            defence: 0,
            evasion: 0,
            accuracy: 0,
            speed: 0
        };

        for (item in this) {
            if (this.hasOwnProperty(item)) {
                if (this[item]) {
                    stats.attack += this[item].attack;
                    stats.defence += this[item].defence;
                    stats.evasion += this[item].evasion;
                    stats.accuracy += this[item].accuracy;
                    stats.speed += this[item].speed;
                }
            }
        }

        return stats;
    }
}
