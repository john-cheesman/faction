import Prefab from '../models/prefab';
import IPrefabTypes from '../interfaces/prefab-types.interface';
import IArea from '../interfaces/area.interface';
import GamePlay from './game-play.state';
import Person from '../models/prefabs/person';
import Player from '../models/prefabs/persons/player';
import Enemy from '../models/prefabs/persons/enemy';
import Combatant from '../models/prefabs/persons/combatant';
import Chest from '../models/prefabs/chest';
import Fire from '../models/prefabs/fire';
import Exit from '../models/prefabs/exit';
import Sign from '../models/prefabs/sign';
import Storage from '../helpers/storage.helper';
import Progress from '../models/progress';
import PathFinder from '../plugins/path-finder.plugin';
import Utility from '../helpers/utility.helper';

let prefabClasses: IPrefabTypes;

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
    public areaData: IArea;
    public player: Player;

    init(areaData: any) {
        super.init(areaData.gamePlayData);

        this.areaData = <IArea>areaData;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        let player,
            playerPosition,
            progress,
            collisionLayerData,
            tileDimensions;


        this.areaData.prefabs.forEach((prefabData) => {
            prefabData.y -= this.map.tileHeight;
            this.createObject(prefabData);
        });

        // enemies = this.areaData.enemies;

        // if (enemies) {
        //     enemies.forEach((enemy) => {
        //         enemy.properties.group = 'enemies';
        //         enemy.type = 'Enemy';

        //         this.createObject(enemy);
        //     });
        // }

        player = this.areaData.player;
        playerPosition = Storage.loadPlayerPosition();

        if (playerPosition) {
            player.prefabData.spriteData.x = playerPosition.x;
            player.prefabData.spriteData.y = playerPosition.y;

            Storage.clearPlayerPosition();
        }

        this.player = this.createObject(player);

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

    createObject(objectData: any) {
        let prefab;

        if (prefabClasses.hasOwnProperty(objectData.type)) {
            prefab = new prefabClasses[objectData.type](this, objectData.name, objectData.x, objectData.y, objectData.properties, objectData.visible);

            if (objectData.properties.group) {
                this.addObjectToGroup(prefab, objectData.group);
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

    addObjectToGroup(prefab: Prefab, group: string) {
        if (this.groups[group] !== null) {
            this.groups[group].add(prefab);
        }
        else {
            console.error(`Unknown group: ${group}`);
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.layers['collision']);
    }

    render() {
        this.player.render();
    }
}
