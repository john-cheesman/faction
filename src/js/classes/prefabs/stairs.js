import { Prefab } from '../prefab';
import {sprites, dimensions} from '../../config';

export class Stairs extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.targetState = properties.targetState;
        this.hidden = properties.hidden;
    }

    update() {
        this.game.physics.arcade.overlap(this.gameState.groups.party, this, this.use, null, this);
    }

    use() {
        if (!this.hidden) {
            let currentState = this.game.state.getCurrentState();

            this.gameState.leaveArea();
            //this.game.state.start(this.targetState, true, false, currentState.levelID);
        }
    }
}
