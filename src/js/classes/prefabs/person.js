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
}
