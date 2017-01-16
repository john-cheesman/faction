import IItem from '../interfaces/i-item';

export default class Item {
    private _itemData: IItem;

    constructor(itemData: IItem) {
        this._itemData = itemData;
    }

    get id() {
        return this._itemData.id;
    }

    get name() {
        return this._itemData.name;
    }

    get description() {
        return this._itemData.description;
    }

    get baseValue() {
        return this._itemData.baseValue;
    }
}
