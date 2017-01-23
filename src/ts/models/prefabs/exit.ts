import IExit from '../../interfaces/exit.interface';
import ICoordinate from '../../interfaces/coordinate.interface';
import Prefab from '../prefab';
import Storage from '../../helpers/storage.helper';
import Utility from '../../helpers/utility.helper'

export default class Exit extends Prefab {
    constructor(private _exitData: IExit) {
        super(_exitData.prefabData);
    }

    get targetArea(): string {
        return this._exitData.targetArea;
    }

    get hidden(): boolean {
        return this._exitData.hidden;
    }

    get targetCoords(): ICoordinate {
        return this._exitData.targetCoords;
    }

    update() {
        this.game.physics.arcade.overlap(this.gamePlay.player, this, this.use, null, this);
    }

    use() {
        if (!this.hidden && Utility.isOnTop(this.gamePlay.player.position, this.position, this.gamePlay.tileDimensions)) {
            let currentState;

            currentState = this.game.state.getCurrentState();

            Storage.savePlayerPosition(Utility.getPointFromCoord(this.targetCoords, this.gamePlay.tileDimensions));

            this.gamePlay.leaveArea();
            this.game.state.start('Boot', true, false, `data/area/area-${this.targetArea}-data.json`, 'Area');
        }
    }
}
