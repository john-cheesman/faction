import { Prefab } from '../prefab';
import {sprites, dimensions} from '../../config';

export class Stairs extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.targetArea = properties.targetArea;
        this.hidden = properties.hidden;
    }

    update() {
        this.game.physics.arcade.overlap(this.gameState.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden) {
            let currentState = this.game.state.getCurrentState();

            this.gameState.leaveArea();
            this.game.state.start('Boot', true, false, `data/area-${this.targetArea}-data.json`, 'Area');
        }
    }
}
