import { Prefab } from '../prefab';
import { Message } from '../message';
import { Utility } from '../utility';
import { animations } from '../../constants/animations';

export class Chest extends Prefab {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.contents = properties.contents;
        this.quantity = properties.quantity;
        this.opened = properties.opened === 'true';

        this.animations.add('open', animations.chest.open, 10);

        this.inputEnabled = true;

        this.events.onInputDown.add(this.interact, this);
    }

    interact() {
        let playerIsAdjacent;

        playerIsAdjacent = Utility.isAdjacent(this.position, this.gameState.player.position, this.gameState.tileDimensions);

        if (!this.opened && playerIsAdjacent) {
            this.animations.play('open');

            Message.create(this.gameState.game, `You found ${this.contents}`);

            this.opened = true;
        }
    }
}
