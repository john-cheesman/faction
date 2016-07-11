export class Prefab extends Phaser.Sprite {
    constructor(gameState, name, x, y, properties) {
        super(gameState.game, x, y, properties.texture, parseInt(properties.frame, 10));

        this.gameState = gameState;
        this.name = name;
        this.textureName = properties.texture;

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
