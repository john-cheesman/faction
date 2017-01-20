import IDerivedStats from '../interfaces/derived-stats.interface';
import DerivedStats from '../models/derived-stats';
import EquippableItem from '../models/items/equippable-item';
import Equipment from '../models/equipment';

export default class EquipmentHelper {

    static equipItem(item: EquippableItem, itemSlot: string, equipment: Equipment): EquippableItem {
        let previousItem: EquippableItem;

        previousItem = equipment[itemSlot];

        equipment[itemSlot] = item;

        return previousItem;
    }

    static unequipItem(itemSlot: string, equipment: Equipment): EquippableItem {
        let previousItem: EquippableItem;

        previousItem = equipment[itemSlot];
        equipment[itemSlot] = null;

        return previousItem;
    }

    static getAggregateStats(equipment: Equipment): DerivedStats {
        let statsDataList: DerivedStats[],
            stat: string;

        for (stat in equipment) {
            if (Object.hasOwnProperty(stat)) {
                statsDataList.push(equipment[stat].derivedStats);
            }
        }

        return new DerivedStats(this.totalDerivedStats(statsDataList));
    }

    static totalDerivedStats(statsList: DerivedStats[]): IDerivedStats {
        let totalStats: IDerivedStats,
            stat: string;

        statsList.forEach(stats => {
            for (stat in stats) {
                if (Object.hasOwnProperty(stat)) {
                    totalStats[stat] += stats[stat];
                }
            }
        });

        return totalStats;
    }
}
