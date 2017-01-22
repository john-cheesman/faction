import IPrefab from '../interfaces/prefab.interface';

export default class Prefab extends Phaser.Sprite {
    constructor(private _prefabData: IPrefab) {
        super(
            _prefabData.spriteData.game,
            _prefabData.spriteData.x,
            _prefabData.spriteData.y,
            _prefabData.spriteData.texture,
            _prefabData.spriteData.frame);

        //this.textureName = prefabData.spriteData.texture;
        this.alpha = this.visible ? 1 : 0;

        if (_prefabData.flipX) {
            this.anchor.setTo(0.5, 0);
            this.scale.x *= -1;
            this.x += (_prefabData.gamePlay.map.tileHeight / 2);
        }

        if (_prefabData.flipY) {
            this.anchor.setTo(0, 0.5);
            this.scale.y *= -1;
            this.y += (_prefabData.gamePlay.map.tileHeight / 2);
        }

        this.gamePlay.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }

    get gamePlay() {
        return this._prefabData.gamePlay;
    }

    get name() {
        return this._prefabData.name;
    }
}
