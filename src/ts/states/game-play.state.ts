export default class GamePlay extends Phaser.State {
    public gamePlayData: any;

    public map: Phaser.Tilemap;

    public layers: Object;

    init(gamePlayData: any) {
        this.gamePlayData = gamePlayData;

        this.map = this.game.add.tilemap(gamePlayData.map.key);

        this.map.addTilesetImage(gamePlayData.map.tilesetImage.name, gamePlayData.map.tilesetImage.key);
    }
}
