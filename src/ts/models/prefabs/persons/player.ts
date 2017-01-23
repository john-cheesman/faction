import IPerson from '../../../interfaces/person.interface';
import Person from '../person';
import spriteFrames from '../../../constants/sprite-frames';

export default class Player extends Person {
    constructor(_personData: IPerson) {
        super(_personData);

        this.gamePlay.game.camera.follow(this);

        this.reticule = this.gamePlay.game.add.sprite(0, 0, 'uiSpritesheet', spriteFrames.ui.reticule);
        this.reticule.anchor.setTo(0.5);
        this.reticule.visible = false;
    }

    public interactionTarget: any;

    render() {
        //this.gamePlay.game.debug.text(`position: ${Math.floor(this.position.x)}, ${Math.floor(this.position.y)}`, 32, 32);
    }
}
