import Player from './persons/player';
import Direction from '../../enums/direction';
import IPerson from '../../interfaces/person.interface';
import Prefab from '../prefab';
import Inventory from '../inventory';
import EquippableItem from '../items/equippable-item';
import spriteFrames from '../../constants/sprite-frames';
import animations from '../../constants/animations';

const quarterPi = Math.PI / 4;

export default class Person extends Prefab {
    constructor(private _personData: IPerson) {
        super(_personData.prefabData);

        this.frame = spriteFrames.person[_personData.direction];

        this.body.setSize(24, 36, 4, 0);
        this.anchor.setTo(0.5, 0.75);

        this.movementSpeed = 120;

        this.path = [];

        this.pathStep = -1;

        this.animations.add('Up', animations.person.walk.up, 10, true);
        this.animations.add('Right', animations.person.walk.right, 10, true);
        this.animations.add('Down', animations.person.walk.down, 10, true);
        this.animations.add('Left', animations.person.walk.left, 10, true);

        // if (properties.inventory) {
        //     let item;

        //     this.inventory = new Inventory();

        //     if (properties.inventory.equippableItems) {
        //         properties.inventory.equippableItems.forEach((item) => {
        //             this.inventory.addItem(EquippableItem.instantiateFromString(item));
        //         });
        //     }
        // }
    }

    public movementSpeed: number;
    public path: Phaser.Point[];
    public pathStep: number;
    public reticule: Phaser.Sprite;

    get direction(): Direction {
        return this._personData.direction || 'Down';
    }

    set direction(value: Direction) {
        this._personData.direction = value;
    }

    enableInteraction(player: Player, person: Person) {
        player.interactionTarget = person;
    }

    interact() {
        console.log('yo');
    }

    update() {
        let nextPosition: Phaser.Point,
            velocity: Phaser.Point;

        if (this.path.length > 0) {
            nextPosition = this.path[this.pathStep];

            if (!this.reachedTargetPosition(nextPosition)) {
                velocity = new Phaser.Point(nextPosition.x - this.position.x, nextPosition.y - this.position.y);
                velocity.normalize();
                this.body.velocity.x = velocity.x * this.movementSpeed;
                this.body.velocity.y = velocity.y * this.movementSpeed;
                this.direction = this.getDirection(this.body.angle);
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

    reachedTargetPosition(targetPosition: Phaser.Point) {
        let distance;

        distance = Phaser.Point.distance(this.position, targetPosition);

        return distance < 1;
    }

    moveTo(targetPosition: Phaser.Point) {
        if (this.path.length <= 0) {
            this.gamePlay.pathFinder.findPath(this.position, targetPosition, this.moveThroughPath, this);
        }
    }

    moveThroughPath(path: Phaser.Point[]) {
        if (path !== null) {
            this.path = path;
            this.pathStep = 0;
            this.updateReticule(path[path.length - 1]);
        }
        else {
            this.path = [];
        }
    }

    updateReticule(position: Phaser.Point) {
        if (this.reticule && position) {
            this.reticule.position = position;
            this.reticule.visible = true;
        }
    }

    private getDirection(angle: number): Direction {
        let direction: Direction;

        switch (true) {
            case (angle >= (quarterPi * -3) && angle < (-quarterPi)):
                direction = 'Up';
                break;

            case (angle >= (-quarterPi) && angle < quarterPi):
                direction = 'Right';
                break;

            case (angle >= quarterPi && angle < (quarterPi * 3)):
                direction = 'Down';
                break;

            default:
                direction = 'Left';
                break;
        }

        return direction;
    }
}
