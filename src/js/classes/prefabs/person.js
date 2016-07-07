import { Prefab } from '../prefab';
import { frames } from '../../config';

export class Person extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.direction = properties.direction;

        this.frame = frames.person[this.direction];

        this.body.setSize(28, 32, 4, 8);
    }

    enableInteraction(player, person) {
        player.interactionTarget = person;
    }

    interact() {
        console.log('yo');
    }
}
