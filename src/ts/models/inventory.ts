import Item from './item';
import EquippableItem from './items/equippable-item';

export default class Inventory {
    private _items: Item[];

    constructor() {
        this._items = [];
    }

    addItem(item: Item) {
        this._items.push(item);
    }

    get items(): Item[] {
        return this._items;
    }

    get equippableItems(): Item[] {
        return this._items.filter((object) => {
            return object instanceof EquippableItem;
        });
    }
}
