import { Person } from '../person';
import { spriteFrames } from '../../../constants/sprite-frames';

export class Player extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.gameState.game.camera.follow(this);

        this.interactionTarget = null;

        this.body.setSize(24, 36, 4, 0);
        this.anchor.setTo(0.5, 0.75);

        this.reticule = this.gameState.game.add.sprite(0, 0, 'uiSpritesheet', spriteFrames.ui.reticule);
        this.reticule.anchor.setTo(0.5);
        this.reticule.visible = false;
    }

    render() {
        //this.gameState.game.debug.text('position: ' + this.position, 32, 32);
    }
}
