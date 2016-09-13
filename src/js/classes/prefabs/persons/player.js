import { Person } from '../person';

export class Player extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);
        
        this.gameState.game.camera.follow(this);

        this.interactionTarget = null;

        this.body.setSize(24, 36, 4, 0);
        this.anchor.setTo(0.5, 0.75);
    }

    render() {
        this.gameState.game.debug.text('velocity: ' + this.body.velocity, 32, 32);
        this.gameState.game.debug.text('angle: ' + this.body.angle, 32, 64);
    }
}
