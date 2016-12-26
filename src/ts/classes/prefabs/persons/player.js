import { Person } from '../person';
import { spriteFrames } from '../../../constants/sprite-frames';

export class Player extends Person {
    constructor(gameState, name, x, y, properties, visible) {
        super(gameState, name, x, y, properties, visible);

        this.gameState.game.camera.follow(this);

        this.interactionTarget = null;

        this.reticule = this.gameState.game.add.sprite(0, 0, 'uiSpritesheet', spriteFrames.ui.reticule);
        this.reticule.anchor.setTo(0.5);
        this.reticule.visible = false;
    }

    render() {
        //this.gameState.game.debug.text(`position: ${Math.floor(this.position.x)}, ${Math.floor(this.position.y)}`, 32, 32);
    }
}
