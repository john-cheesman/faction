import { Person } from '../prefabs/person';
import { Player } from '../prefabs/persons/player';
import { Enemy } from '../prefabs/persons/enemy';
import { Combatant } from '../prefabs/persons/combatant';
import { Chest } from '../prefabs/chest';
import { Fire } from '../prefabs/fire';
import { Stairs } from '../prefabs/stairs';
import { Storage } from '../storage';
import { Progress } from '../progress';
import { PathFinder } from '../../plugins/path-finder';
import { Utility } from '../utility';

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
            progress,
            collisionLayerData,
            tileDimensions;

        this.layers = {};

        this.map.layers.forEach((layer) => {
            this.layers[layer.name] = this.map.createLayer(layer.name);

            if (layer.properties.collision) {
                this.map.setCollisionByExclusion([], true, this.layers[layer.name]);
                collisionLayerData = layer.data;
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

        tileDimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
        this.pathFinder = this.game.plugins.add(PathFinder, collisionLayerData, [-1], tileDimensions);

        this.game.input.onDown.add(this.movePlayer, this);
    }

    movePlayer() {
        let targetPosition;

        targetPosition = Utility.offsetCameraPosition(this.game.camera, new Phaser.Point(this.game.input.activePointer.x, this.game.input.activePointer.y));

        this.player.moveTo(targetPosition);
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

    findPathTo(tilex, tiley) {
        let map;

        map = this.map;

        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                map.putTile(46, path[i].x, path[i].y);
            }
            blocked = false;
        });

        this.pathfinder.preparePathCalculation([0,0], [tilex,tiley]);
        this.pathfinder.calculatePath();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.groups.chests, this.enableInteraction, null, this);
        this.game.physics.arcade.collide(this.player, this.groups.enemies, this.enableInteraction, null, this);
        this.game.physics.arcade.collide(this.player, this.layers.subCollisionLayer, this.player.stopMoving, null, this.player);
        this.game.physics.arcade.collide(this.player, this.layers.superCollisionLayer, this.player.stopMoving, null, this.player);
    }

    enableInteraction(player, object) {
        object.enableInteraction(player, object);
    }

    render() {
        this.player.render();
    }
}
