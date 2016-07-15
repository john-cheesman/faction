import { Person } from '../person';
import { animations } from '../../../constants/animations';
import { frames } from '../../../constants/frames';

export class Player extends Person {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.animations.add('up', animations.person.walk.up, 10);
        this.animations.add('right', animations.person.walk.right, 10);
        this.animations.add('down', animations.person.walk.down, 10);
        this.animations.add('left', animations.person.walk.left, 10);

        this.keyboard = this.game.input.keyboard;

        this.controls = {
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            interact: Phaser.Keyboard.SPACEBAR
        };

        this.speed = 120;

        this.gameState.game.camera.follow(this);

        this.interactionTarget = null;

        this.body.immovable = false;
        this.body.setSize(24, 24, 4, 16);
    }

    update() {
        let up,
            down,
            left,
            right,
            interact;

        up = this.keyboard.isDown(this.controls.up) || this.gameState.game.controls.joystick.properties.up;
        down = this.keyboard.isDown(this.controls.down) || this.gameState.game.controls.joystick.properties.down;
        left = this.keyboard.isDown(this.controls.left) || this.gameState.game.controls.joystick.properties.left;
        right = this.keyboard.isDown(this.controls.right) || this.gameState.game.controls.joystick.properties.right;
        interact = this.keyboard.isDown(this.controls.interact) || this.gameState.game.controls.button.isDown;

        this.gameState.game.physics.arcade.collide(this, this.gameState.layers.subCollisionLayer);
        this.gameState.game.physics.arcade.collide(this, this.gameState.layers.superCollisionLayer);

        if (up && !left && !right) {
            this.body.velocity.y = this.speed * -1;
            this.body.velocity.x = 0;
            this.direction = 'up';
            this.animations.play('up');
        }
        else if (down && !left && !right) {
            this.body.velocity.y = this.speed;
            this.body.velocity.x = 0;
            this.direction = 'down';
            this.animations.play('down');
        }
        else if (left && !up && !down) {
            this.body.velocity.x = this.speed * -1;
            this.body.velocity.y = 0;
            this.direction = 'left';
            this.animations.play('left');
        }
        else if (right && !up && !down) {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = 0;
            this.direction = 'right';
            this.animations.play('right');
        }
        else if (up && left) {
            this.body.velocity.y = this.speed * -1;
            this.body.velocity.x = this.speed * -1;
            this.direction = 'up';
            this.animations.play('up');
        }
        else if (up && right) {
            this.body.velocity.y = this.speed * -1;
            this.body.velocity.x = this.speed * 1;
            this.direction = 'up';
            this.animations.play('up');
        }
        else if (down && left) {
            this.body.velocity.y = this.speed * 1;
            this.body.velocity.x = this.speed * -1;
            this.direction = 'down';
            this.animations.play('down');
        }
        else if (down && right) {
            this.body.velocity.y = this.speed * 1;
            this.body.velocity.x = this.speed * 1;
            this.direction = 'down';
            this.animations.play('down');
        }
        else if (interact) {
            if (this.interactionTarget) {
                this.interactionTarget.interact();

                this.interactionTarget = null;
            }
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
            this.frame = frames.person[this.direction];
        }
    }
}
