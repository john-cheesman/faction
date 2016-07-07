import { Prefab } from '../prefab';
import { animations, sprites } from '../../config';

export class Chest extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.contents = properties.contents;
        this.quantity = properties.quantity;
        this.opened = properties.opened === 'true';

        this.animations.add('open', animations.chest.open, 10);
    }

    update() {
        //this.gameState.game.physics.arcade.overlap(this.gameState.groups.player.children[0], this, this.enableInteraction, null, this);
    }

    enableInteraction(player, chest) {
        player.interactionTarget = chest;
    }

    interact() {
        if (!this.opened) {
            this.animations.play('open');

            console.log('You found ' + this.contents);

            this.opened = true;
        }
    }
}
