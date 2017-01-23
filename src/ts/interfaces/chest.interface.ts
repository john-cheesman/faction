import IItem from './item.interface';
import IEquippableItem from './equippable-item.interface';
import IPrefab from './prefab.interface';

interface IChest {
    prefabData: IPrefab,
    contents: IItem | IEquippableItem,
    quantity: number,
    opened?: boolean
}

export default IChest
