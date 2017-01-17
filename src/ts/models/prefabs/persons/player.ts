import Person from '../person';
import spriteFrames from '../../../constants/sprite-frames';

export default class Player extends Person {
    constructor(private _personData: IPerson) {
        super(_personData);

        this.gameState.game.camera.follow(this);

        this.reticule = this.gameState.game.add.sprite(0, 0, 'uiSpritesheet', spriteFrames.ui.reticule);
        this.reticule.anchor.setTo(0.5);
        this.reticule.visible = false;
    }

    public interactionTarget: any;
    public reticule: Phaser.Sprite;

    render() {
        //this.gameState.game.debug.text(`position: ${Math.floor(this.position.x)}, ${Math.floor(this.position.y)}`, 32, 32);
    }
}
