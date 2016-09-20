import { dimensions } from '../constants/dimensions';
import { colours } from '../constants/colours';

export class Message {
    constructor(game, text, frame, key) {
        let textX,
            textY,
            textWidth;

        this.game = game;
        this.ground = new Phaser.Graphics(this.game);

        if (frame && key) {
            this.sprite = new Phaser.Sprite(game, (dimensions.tileSize / 2), (dimensions.gameHeight - (dimensions.tileSize / 2)), key, frame);
            this.sprite.fixedToCamera = true;
            this.sprite.anchor.set(0, 1);

            textX = (dimensions.tileSize * 2);
            textWidth = dimensions.gameWidth - (dimensions.tileSize * 2.5);
        }
        else {
            textX = (dimensions.tileSize / 2);
            textWidth = dimensions.gameWidth - dimensions.tileSize;
        }

        textY = dimensions.gameHeight - (dimensions.tileSize * 1.5);

        this.text = new Phaser.Text(game, textX, textY, text, {
            font: '16px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: textWidth
        });

        this.text.fixedToCamera = true;
        this.ground.fixedToCamera = true;

        this.text.lineSpacing = -6;

        this.ground.beginFill(colours.black, 0.85);
        this.ground.drawRect(0, (dimensions.gameHeight - (dimensions.tileSize * 2)), dimensions.gameWidth, (dimensions.tileSize * 2));

        this.game.add.existing(this.ground);
        this.game.add.existing(this.text);

        if (this.sprite) {
            this.game.add.existing(this.sprite);
        }

        this.hide();

    }

    display(duration = 1000) {
        this.text.visible = true;
        this.ground.visible = true;

        if (this.sprite) {
            this.sprite.visible = true;
        }
        this.game.time.events.add(duration, this.hide, this);
    }

    hide() {
        this.text.visible = false;
        this.ground.visible = false;

        if (this.sprite) {
            this.sprite.visible = false;
        }
    }

    static create(game, text) {
        let message;

        message = new this(game, text);

        message.display();
    }
}
