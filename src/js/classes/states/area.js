import { Player } from '../prefabs/persons/player';
import { Soldier } from '../prefabs/persons/soldier';
import { Shadow } from '../prefabs/persons/shadow';
import { Chest } from '../prefabs/chest';
import { Fire } from '../prefabs/fire';
import { Stairs } from '../prefabs/stairs';

let prefabClasses;

prefabClasses = {
    Player: Player,
    Soldier: Soldier,
    Shadow: Shadow,
    Chest: Chest,
    Fire: Fire,
    Stairs: Stairs
};

export class Area extends Phaser.State {
    init(areaData) {
        this.areaData = areaData;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.game.add.tilemap(areaData.map.key);

        this.map.addTilesetImage(areaData.map.tilesetImage.name, areaData.map.tilesetImage.key);
    }

    create() {
        let groupName,
            objectLayer;

        this.layers = {};

        this.map.layers.forEach((layer) => {
            this.layers[layer.name] = this.map.createLayer(layer.name);

            if (layer.properties.collision) {
                this.map.setCollisionByExclusion([], true, this.layers[layer.name]);
            }
        }, this);

        this.layers[this.map.layer.name].resizeWorld();

        this.groups = {};

        this.areaData.groups.forEach(function (groupName) {
            this.groups[groupName] = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        }, this);

        this.prefabs = {};

        for (objectLayer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(objectLayer)) {
                this.map.objects[objectLayer].forEach(this.createObject, this);
            }
        }

        console.log(this.groups);

        this.game.controls = {};

        this.game.controls.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        this.game.controls.joystick = this.game.controls.gamepad.addJoystick(35, 250, 0.5, 'gamepad');

        this.game.controls.button = this.game.controls.gamepad.addButton(270, 250, 0.5, 'gamepad');
    }

    leaveArea() {}

    createObject(object) {
        let objectY,
            position,
            prefab;

        objectY = object.y - this.map.tileHeight;

        if (prefabClasses.hasOwnProperty(object.type)) {
            prefab = new prefabClasses[object.type](this, object.name, object.x, objectY, object.properties);

            if (object.properties.group) {
                if (this.groups.hasOwnProperty(object.properties.group)) {
                    this.groups[object.properties.group].add(prefab);
                }
                else {
                    console.error(`Unknown group: ${object.properties.group}`);
                }
            }
            else {
                this.game.add.existing(prefab);
            }
        }
        else {
            console.error(`Unknown prefab type: ${object.type}`);
        }
    }

    update() {
        this.game.physics.arcade.collide(this.groups.player, this.groups.chests, this.enableInteraction, null, this);
        this.game.physics.arcade.collide(this.groups.player, this.groups.enemies, this.enableInteraction, null, this);
    }

    enableInteraction(player, object) {
        object.enableInteraction(player, object);
    }
}
