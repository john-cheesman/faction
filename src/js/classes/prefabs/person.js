import { Prefab } from '../prefab';
import { Inventory } from '../inventory';
import { EquippableItem } from '../items/equippable-item';
import { spriteFrames } from '../../constants/sprite-frames';

export class Person extends Prefab {
    constructor(gameState, name, x, y, properties) {
        super(gameState, name, x, y, properties);

        this.direction = properties.direction || 'down';

        this.frame = spriteFrames.person[this.direction];

        this.body.setSize(28, 32, 4, 8);

        this.movementSpeed = 120;

        this.path = [];

        this.pathStep = -1;

        if (properties.inventory) {
            let item;

            this.inventory = new Inventory();

            if (properties.inventory.equippableItems) {
                properties.inventory.equippableItems.forEach((item) => {
                    this.inventory.addItem(EquippableItem.instantiateFromString(item));
                });
            }
        }

        console.log(this.inventory);
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
            }
            else {
                this.position.x = nextPosition.x;
                this.position.y = nextPosition.y;
                console.log(this.position);

                if (this.pathStep < this.path.length - 1) {
                    this.pathStep += 1;
                }
                else {
                    this.path = [];
                    this.pathStep = -1;
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                }
            }
        }
    }

    reachedTargetPosition(targetPosition) {
        let distance;

        distance = Phaser.Point.distance(this.position, targetPosition);

        return distance < 1;
    }

    moveTo(targetPosition) {
        console.log(targetPosition);
        this.gameState.pathFinder.findPath(this.position, targetPosition, this.moveThroughPath, this);
    }

    moveThroughPath(path) {
        console.log(path);
        if (path !== null) {
            this.path = path;
            this.pathStep = 0;
        }
        else {
            this.path = [];
        }
    }
}
