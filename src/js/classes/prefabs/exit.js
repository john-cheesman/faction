import { Prefab } from '../prefab';
import { Storage } from '../storage';
import { Utility } from '../utility';

export class Exit extends Prefab {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.targetArea = properties.targetArea;
        this.hidden = properties.hidden;
        this.targetCoords = {
            row: properties.targetRow,
            column: properties.targetColumn
        };
    }

    update() {
        this.game.physics.arcade.overlap(this.gameState.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden && Utility.isOnTop(this.gameState.player.position, this.position, this.gameState.tileDimensions)) {
            let currentState;

            currentState = this.game.state.getCurrentState();

            Storage.savePlayerPosition(Utility.getPointFromCoord(this.targetCoords, this.gameState.tileDimensions));

            this.gameState.leaveArea();
            this.game.state.start('Boot', true, false, `data/area/area-${this.targetArea}-data.json`, 'Area');
        }
    }
}
