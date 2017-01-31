import IGroups from '../interfaces/groups.interface';
import ILayers from '../interfaces/layers.interface';
import PathFinderPlugin from '../plugins/path-finder.plugin';
import IGamePlay from '../interfaces/game-play.interface';

export default class GamePlay extends Phaser.State {
    public gamePlayData: IGamePlay;
    public map: Phaser.Tilemap;
    public layers: ILayers;
    public groups: IGroups;
    public tileDimensions: Phaser.Point;
    public pathFinder: PathFinderPlugin;

    init(gamePlayData: any) {
        this.gamePlayData = <IGamePlay>gamePlayData;

        this.map = this.game.add.tilemap(gamePlayData.map.key);

        this.map.addTilesetImage(gamePlayData.map.tilesetImage.name, gamePlayData.map.tilesetImage.key);
    }

    create() {
        let collisionLayerData: any;

        this.tileDimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);

        this.map.layers.forEach((layer) => {
            if (!layer.properties.top) {
                this.layers[layer.name] = this.map.createLayer(layer.name);

                if (layer.properties.collision === true) {
                    this.map.setCollisionByExclusion([], true, this.layers[layer.name]);
                    collisionLayerData = layer.data;
                }
            }
        }, this);

        this.layers[0].resizeWorld();

        this.gamePlayData.groups.forEach((groupName) => {
            this.groups[groupName] = this.game.world.addAt(new Phaser.Group(this.game, null, groupName, false, true, Phaser.Physics.ARCADE), 3);
        }, this);

        this.pathFinder = <PathFinderPlugin>this.game.plugins.add(PathFinderPlugin, collisionLayerData, [-1], this.tileDimensions);
    }
}
