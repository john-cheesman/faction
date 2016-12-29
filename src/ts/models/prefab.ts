export default class Prefab extends Phaser.Sprite {
    constructor(gameState, name, x, y, properties, visible = true) {
        super(gameState.game, x, y, properties.texture, parseInt(properties.frame, 10));

        this.gameState = gameState;
        this.name = name;
        this.textureName = properties.texture;
        this.alpha = visible ? 1 : 0;

        if (properties.flipX) {
            this.anchor.setTo(0.5, 0);
            this.scale.x *= -1;
            this.x += (gameState.map.tileHeight / 2);
        }

        if (properties.flipY) {
            this.anchor.setTo(0, 0.5);
            this.scale.y *= -1;
            this.y += (gameState.map.tileHeight / 2);
        }

        this.gameState.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }
}
