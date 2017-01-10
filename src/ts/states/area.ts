import GamePlay from './game-play';
import Person from '../models/prefabs/person';
import Player from '../models/prefabs/persons/player';
import Enemy from '../models/prefabs/persons/enemy';
import Combatant from '../models/prefabs/persons/combatant';
import Chest from '../models/prefabs/chest';
import Fire from '../models/prefabs/fire';
import Exit from '../models/prefabs/exit';
import Sign from '../models/prefabs/sign';
import Storage from '../helpers/storage';
import Progress from '../models/progress';
import PathFinder from '../plugins/path-finder';
import Utility from '../helpers/utility';

let prefabClasses: any;

prefabClasses = {
    Person: Person,
    Player: Player,
    Enemy: Enemy,
    Combatant: Combatant,
    Chest: Chest,
    Fire: Fire,
    Exit: Exit,
    Sign: Sign
};

export default class Area extends GamePlay {
    init(areaData: any) {
        super.init(areaData);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        let groupName,
            object,
            objectLayer,
            enemies,
            enemy,
            player,
            playerPosition,
            progress,
            collisionLayerData,
            tileDimensions;

        this.layers = {};

        this.map.layers.forEach((layer) => {
            if (!layer.properties.top) {
                this.layers[layer.name] = this.map.createLayer(layer.name);

                if (layer.properties.collision === true) {
                    this.map.setCollisionByExclusion([], true, this.layers[layer.name]);
                    collisionLayerData = layer.data;
                }
            }
        }, this);

        this.layers[this.map.layer.name].resizeWorld();

        this.groups = {};

        this.areaData.groups.forEach((groupName) => {
            this.groups[groupName] = this.game.world.addAt(new Phaser.Group(this.game, null, groupName, false, true, Phaser.Physics.ARCADE), 3);
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
            player.x = playerPosition.x;
            player.y = playerPosition.y;

            Storage.clearPlayerPosition();
        }

        this.player = this.createObject(player);

        this.tileDimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);

        this.pathFinder = this.game.plugins.add(PathFinder, collisionLayerData, [-1], this.tileDimensions);

        this.layers['subGroundLayer'].inputEnabled = true;
        this.layers['subGroundLayer'].events.onInputDown.add(this.movePlayer, this);

        this.map.layers.forEach((layer) => {
            if (layer.properties.top) {
                this.layers[layer.name] = this.map.createLayer(layer.name);
            }

            if (layer.properties.interaction) {
                this.layers[layer.name].inputEnabled = true;
                this.layers[layer.name].events.onInputDown.add(this.movePlayer, this);
            }
        }, this);
    }

    movePlayer() {
        let targetPosition;

        targetPosition = Utility.offsetCameraPosition(this.game.camera, new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y));

        this.player.moveTo(targetPosition);
    }

    leaveArea() {
        //Storage.saveParty(this.groups.party);
    }

    createObject(objectData) {
        let prefab;

        if (prefabClasses.hasOwnProperty(objectData.type)) {
            prefab = new prefabClasses[objectData.type](this, objectData.name, objectData.x, objectData.y, objectData.properties, objectData.visible);

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
        this.game.physics.arcade.collide(this.player, this.layers.collision);
    }

    render() {
        this.player.render();
    }
}
