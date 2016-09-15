import { Prefab } from '../prefab';
import { Inventory } from '../inventory';
import { EquippableItem } from '../items/equippable-item';
import { spriteFrames } from '../../constants/sprite-frames';
import { animations } from '../../constants/animations';

const quarterPi = Math.PI / 4;

function getDirection(angle) {
    let direction;

    switch (true) {
        case (angle >= (quarterPi * -3) && angle < (-quarterPi)):
            direction = 'up';
            break;

        case (angle >= (-quarterPi) && angle < quarterPi):
            direction = 'right';
            break;

        case (angle >= quarterPi && angle < (quarterPi * 3)):
            direction = 'down';
            break;

        default:
            direction = 'left';
            break;
    }

    return direction;
}

export class Person extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.direction = properties.direction || 'down';

        this.frame = spriteFrames.person[this.direction];

        this.body.setSize(28, 32, 4, 8);

        this.movementSpeed = 120;

        this.path = [];

        this.pathStep = -1;

        this.animations.add('up', animations.person.walk.up, 10, true);
        this.animations.add('right', animations.person.walk.right, 10, true);
        this.animations.add('down', animations.person.walk.down, 10, true);
        this.animations.add('left', animations.person.walk.left, 10, true);

        if (properties.inventory) {
            let item;

            this.inventory = new Inventory();

            if (properties.inventory.equippableItems) {
                properties.inventory.equippableItems.forEach((item) => {
                    this.inventory.addItem(EquippableItem.instantiateFromString(item));
                });
            }
        }
    }

    enableInteraction(player, person) {
        player.interactionTarget = person;
    }

    interact() {
        console.log('yo');
    }

    update() {
        let nextPosition,
            velocity;

        if (this.path.length > 0) {
            nextPosition = this.path[this.pathStep];

            if (!this.reachedTargetPosition(nextPosition)) {
                velocity = new Phaser.Point(nextPosition.x - this.position.x, nextPosition.y - this.position.y);
                velocity.normalize();
                this.body.velocity.x = velocity.x * this.movementSpeed;
                this.body.velocity.y = velocity.y * this.movementSpeed;
                this.direction = getDirection(this.body.angle);
                this.animations.play(this.direction);
            }
            else {
                this.position.x = nextPosition.x;
                this.position.y = nextPosition.y;

                if (this.pathStep < this.path.length - 1) {
                    this.pathStep += 1;
                }
                else {
                    this.stopMoving();
                }
            }
        }
    }

    stopMoving() {
        this.path = [];
        this.pathStep = -1;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.stop();
        this.frame = spriteFrames.person[this.direction];

        if (this.reticule) {
            this.reticule.visible = false;
        }
    }

    reachedTargetPosition(targetPosition) {
        let distance;

        distance = Phaser.Point.distance(this.position, targetPosition);

        return distance < 1;
    }

    moveTo(targetPosition) {
        if (!this.path.length > 0) {
            this.gameState.pathFinder.findPath(this.position, targetPosition, this.moveThroughPath, this);
        }
    }

    moveThroughPath(path) {
        if (path !== null) {
            this.path = path;
            this.pathStep = 0;
            this.updateReticule(path[path.length - 1]);
        }
        else {
            this.path = [];
        }

    }

    updateReticule(position) {
        if (this.reticule && position) {
            this.reticule.position = position;
            this.reticule.visible = true;
        }
    }
}
