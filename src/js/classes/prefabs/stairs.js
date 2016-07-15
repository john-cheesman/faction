import { Prefab } from '../prefab';
import { Storage } from '../storage';
import { dimensions } from '../../constants/dimensions';

export class Stairs extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.targetArea = properties.targetArea;
        this.hidden = properties.hidden;
        this.targetPosition = [properties.targetX, properties.targetY];
    }

    update() {
        this.game.physics.arcade.overlap(this.gameState.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden) {
            let currentState = this.game.state.getCurrentState();

            Storage.savePlayerPosition(this.targetPosition);

            this.gameState.leaveArea();
            this.game.state.start('Boot', true, false, `data/area-${this.targetArea}-data.json`, 'Area');
        }
    }
}
