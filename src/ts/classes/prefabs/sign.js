import { Prefab } from '../prefab';
import { Message } from '../message';
import { Utility } from '../utility';

export class Sign extends Prefab {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.inputEnabled = true;

        this.message = properties.message.split('|');

        this.events.onInputDown.add(this.interact, this);
    }

    interact() {
        let playerIsAdjacent;

        playerIsAdjacent = Utility.isAdjacent(this.position, this.gameState.player.position, this.gameState.tileDimensions);

        if (playerIsAdjacent) {
            Message.create(this.gameState.game, this.message);
        }
    }
}
