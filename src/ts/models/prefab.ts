import IPrefab from '../interfaces/prefab.interface';

export default class Prefab extends Phaser.Sprite {
    private _prefabData: IPrefab;

    constructor(prefabData: IPrefab) {
        super(
            prefabData.spriteData.game,
            prefabData.spriteData.x,
            prefabData.spriteData.y,
            prefabData.spriteData.texture,
            prefabData.spriteData.frame);

        this._prefabData = prefabData;
        //this.textureName = prefabData.spriteData.texture;
        this.alpha = this.visible ? 1 : 0;

        if (prefabData.flipX) {
            this.anchor.setTo(0.5, 0);
            this.scale.x *= -1;
            this.x += (prefabData.area.map.tileHeight / 2);
        }

        if (prefabData.flipY) {
            this.anchor.setTo(0, 0.5);
            this.scale.y *= -1;
            this.y += (prefabData.area.map.tileHeight / 2);
        }

        this.area.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }

    get area() {
        return this._prefabData.area;
    }

    get name() {
        return this._prefabData.name;
    }
}
