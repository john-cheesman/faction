import IItem from '../../interfaces/item.interface';
import Item from '../item';
import IChest from '../../interfaces/chest.interface';
import Prefab from '../prefab';
import Utility from '../../helpers/utility.helper';
import Message from '../message';
import animations from '../../constants/animations';

export default class Chest extends Prefab {
    constructor(private _chestData: IChest) {
        super(_chestData.prefabData);

        this.animations.add('open', animations.chest.open, 10);

        this.inputEnabled = true;

        this.events.onInputDown.add(this.interact, this);
    }

    get contents(): Item {
        return new Item(<Item>this._chestData.contents);
    }

    get quantity(): number {
        return this._chestData.quantity;
    }

    get opened(): boolean {
        return this._chestData.opened || false;
    }

    set opened(value) {
        this._chestData.opened = value;
    }

    interact() {
        let playerIsAdjacent;

        playerIsAdjacent = Utility.isAdjacent(this.position, this.gamePlay.player.position, this.gamePlay.tileDimensions);

        if (!this.opened && playerIsAdjacent) {
            this.animations.play('open');

            Message.create(this.gamePlay.game, [`You found ${this.contents}`]);

            this.opened = true;
        }
    }
}
