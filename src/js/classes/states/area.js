import { Person } from '../prefabs/person';
import { Player } from '../prefabs/persons/player';
import { Enemy } from '../prefabs/persons/enemy';
import { Combatant } from '../prefabs/persons/combatant';
import { Chest } from '../prefabs/chest';
import { Fire } from '../prefabs/fire';
import { Stairs } from '../prefabs/stairs';
import { Storage } from '../storage';
import { Progress } from '../progress';

let prefabClasses;

prefabClasses = {
    Person: Person,
    Player: Player,
    Enemy: Enemy,
    Combatant: Combatant,
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
            object,
            objectLayer,
            enemies,
            enemy,
            player,
            playerPosition,
            progress;

        progress = new Progress(this.areaData.name);

        Storage.saveLocalProgress(progress);

        this.layers = {};

        this.map.layers.forEach((layer) => {
            this.layers[layer.name] = this.map.createLayer(layer.name);

            if (layer.properties.collision) {
                this.map.setCollisionByExclusion([], true, this.layers[layer.name]);
            }
        }, this);

        this.layers[this.map.layer.name].resizeWorld();

        this.groups = {};

        this.areaData.groups.forEach((groupName) => {
            this.groups[groupName] = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        }, this);

        this.prefabs = {};

        for (objectLayer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(objectLayer)) {
                this.map.objects[objectLayer].forEach((object) => {
                    object.y -= this.map.tileHeight;
                    this.createObject(object);
                }, this);
            }
        }

        enemies = this.areaData.enemies;

        if (enemies) {
            enemies.forEach((enemy) => {
                enemy.properties.group = 'enemies';
                enemy.type = 'Enemy';

                this.createObject(enemy);
            });
        }

        player = this.areaData.player;
        playerPosition = Storage.loadPlayerPosition();

        if (playerPosition) {
            player.x = playerPosition[0];
            player.y = playerPosition[1];

            Storage.clearPlayerPosition();
        }

        this.player = this.createObject(player);

        this.game.controls = {};

        this.game.controls.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        this.game.controls.joystick = this.game.controls.gamepad.addJoystick(35, 250, 0.5, 'gamepad');

        this.game.controls.button = this.game.controls.gamepad.addButton(270, 250, 0.5, 'gamepad');
    }

    leaveArea() {
        Storage.saveParty(this.groups.party);
    }

    createObject(objectData) {
        let prefab;

        if (prefabClasses.hasOwnProperty(objectData.type)) {
            prefab = new prefabClasses[objectData.type](this, objectData.name, objectData.x, objectData.y, objectData.properties);

            if (objectData.properties.group) {
                this.addObjectToGroup(prefab, objectData.properties.group);
            }
            else {
                this.game.add.existing(prefab);
            }
        }
        else {
            console.error(`Unknown prefab type: ${objectData.type}`);
        }

        return prefab;
    }

    addObjectToGroup(prefab, group) {
        if (this.groups.hasOwnProperty(group)) {
            this.groups[group].add(prefab);
        }
        else {
            console.error(`Unknown group: ${group}`);
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.groups.chests, this.enableInteraction, null, this);
        this.game.physics.arcade.collide(this.player, this.groups.enemies, this.enableInteraction, null, this);
    }

    enableInteraction(player, object) {
        object.enableInteraction(player, object);
    }
}
