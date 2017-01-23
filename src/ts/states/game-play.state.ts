import PathFinderPlugin from '../plugins/path-finder.plugin';
import IGamePlay from '../interfaces/game-play.interface';

export default class GamePlay extends Phaser.State {
    public gamePlayData: IGamePlay;
    public map: Phaser.Tilemap;
    public layers: Object;
    public tileDimensions: Phaser.Point;
    public pathFinder: PathFinderPlugin;

    init(gamePlayData: any) {
        this.gamePlayData = <IGamePlay>gamePlayData;

        this.map = this.game.add.tilemap(gamePlayData.map.key);

        this.map.addTilesetImage(gamePlayData.map.tilesetImage.name, gamePlayData.map.tilesetImage.key);
    }

    create() {
        this.tileDimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);

        this.pathFinder = <PathFinderPlugin>this.game.plugins.add(PathFinderPlugin, collisionLayerData, [-1], this.tileDimensions);
    }
}
