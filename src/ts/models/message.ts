import dimensions from '../constants/dimensions';
import colours from '../constants/colours';
import spriteFrames from '../constants/sprite-frames';

export default class Message {
    constructor(game, text, frame, key) {
        let textX,
            textY,
            textWidth,
            textList;

        this.game = game;
        this.overlay = new Phaser.Graphics(this.game);
        this.ground = new Phaser.Graphics(this.game);
        this.pages = [];
        this.currentPage = 0;

        this.nextControl = new Phaser.Button(game, (dimensions.gameWidth - (dimensions.tileSize * 1.5)), (dimensions.gameHeight - (dimensions.tileSize / 2)), 'uiSpritesheet', this.displayNextPage, this);
        this.nextControl.frame = spriteFrames.ui.caretDown;
        this.nextControl.fixedToCamera = true;
        this.nextControl.anchor.setTo(0, 1);

        textList = Array.isArray(text) ? text : [text];

        if (frame && key) {
            this.sprite = new Phaser.Sprite(game, (dimensions.tileSize / 2), (dimensions.gameHeight - (dimensions.tileSize / 2)), key, frame);
            this.sprite.fixedToCamera = true;
            this.sprite.anchor.set(0, 1);

            textX = (dimensions.tileSize * 2);
            textWidth = dimensions.gameWidth - (dimensions.tileSize * 4);
        }
        else {
            textX = (dimensions.tileSize / 2);
            textWidth = dimensions.gameWidth - (dimensions.tileSize * 2.5);
        }

        textY = dimensions.gameHeight - (dimensions.tileSize * 1.5);

        textList.forEach((textItem) => {
            let textInstance;

            textInstance = new Phaser.Text(game, textX, textY, textItem, {
                font: '16px Consolas',
                fill: Phaser.Color.getWebRGB(colours.white),
                align: 'left',
                wordWrap: true,
                wordWrapWidth: textWidth
            });

            textInstance.lineSpacing = -6;
            textInstance.fixedToCamera = true;

            this.pages.push(textInstance);
        })

        this.ground.fixedToCamera = true;

        this.ground.beginFill(colours.black, 0.85);
        this.ground.drawRect(0, (dimensions.gameHeight - (dimensions.tileSize * 2)), dimensions.gameWidth, (dimensions.tileSize * 2));

        this.overlay.fixedToCamera = true;

        this.overlay.beginFill(colours.black, 0.3);
        this.overlay.drawRect(0, 0, dimensions.gameWidth, dimensions.gameHeight);
        this.overlay.inputEnabled = true;
    }

    display() {
        this.game.add.existing(this.ground);
        this.game.add.existing(this.overlay);
        this.game.add.existing(this.pages[0]);
        this.game.add.existing(this.nextControl);

        if (this.currentPage === (this.pages.length - 1)) {
            this.nextControl.frame = spriteFrames.ui.cross;
        }

        if (this.sprite) {
            this.game.add.existing(this.sprite);
        }
    }

    displayNextPage() {
        this.pages[this.currentPage].visible = false;

        this.currentPage++;

        if (this.currentPage === this.pages.length) {
            this.destroy();
        }
        else {
            if (this.currentPage === (this.pages.length - 1)) {
                this.nextControl.frame = spriteFrames.ui.cross;
            }

            this.game.add.existing(this.pages[this.currentPage]);
        }
    }

    destroy() {
        this.ground.destroy();
        this.overlay.destroy();
        this.nextControl.destroy();

        this.pages.forEach((page) => {
            page.destroy();
        });

        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    static create(game: Phaser.Game, text: string[], frame?: number, key?: string) {
        let message;

        message = new this(game, text, frame, key);

        message.display();

        return message;
    }
}
