import { EquippableItem } from './items/equippable-item';

export class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    get equippableItems() {
        return this.items.filter((object) => {
            return object instanceof EquippableItem;
        });
    }
}
