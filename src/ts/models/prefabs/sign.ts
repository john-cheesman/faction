import Prefab from '../prefab';
import Message from '../message';
import Utility from '../../helpers/utility.helper';
import ISign from '../../interfaces/sign.interface';

export default class Sign extends Prefab {
    constructor(private _signData: ISign) {
        super(_signData.prefabData);

        this.inputEnabled = true;

        this.events.onInputDown.add(this.interact, this);
    }

    get message() {
        return this._signData.message.split('|');
    }

    interact() {
        let playerIsAdjacent;

        playerIsAdjacent = Utility.isAdjacent(this.position, this.gamePlay.player.position, this.gamePlay.tileDimensions);

        if (playerIsAdjacent) {
            Message.create(this.gamePlay.game, this.message);
        }
    }
}
