import { Person } from '../person';
import { animations } from '../../../constants/animations';
import { spriteFrames } from '../../../constants/sprite-frames';

function getMovement(angle, speed) {
    let direction,
        velocity;

    switch (true) {
        case (angle >= -0.375 && angle <= 0.375):
            direction = 'right';
            velocity = {
                x: speed,
                y: 0
            };
            break;

        case (angle >= 0.375 && angle <= 1.125):
            direction = 'right';
            velocity = {
                x: speed,
                y: speed
            };
            break;

        case (angle >= 1.125 && angle <= 1.875):
            direction = 'down';
            velocity = {
                x: 0,
                y: speed
            };
            break;

        case (angle >= 1.875 && angle <= 2.625):
            direction = 'left';
            velocity = {
                x: speed * -1,
                y: speed
            };
            break;

        case (angle >= 2.625 || angle <= -2.625):
            direction = 'left';
            velocity = {
                x: speed * -1,
                y: 0
            };
            break;

        case (angle >= -1.875 && angle <= -1.125):
            direction = 'left';
            velocity = {
                x: speed * -1,
                y: speed * -1
            };
            break;

        case (angle >= -1.125 && angle <= -0.375):
            direction = 'up';
            velocity = {
                x: 0,
                y: speed * -1
            };
            break;

        default:
            direction = 'down';
            velocity = {
                x: 0,
                y: 0
            };
    }

    return {
        direction: direction,
        velocity: velocity
    };
}

export class Player extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.animations.add('up', animations.person.walk.up, 10, true);
        this.animations.add('right', animations.person.walk.right, 10, true);
        this.animations.add('down', animations.person.walk.down, 10, true);
        this.animations.add('left', animations.person.walk.left, 10, true);

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
