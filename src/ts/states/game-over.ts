import Menu from '../models/menu';
import Utility from '../helpers/utility';
import { dimensions } from '../constants/dimensions';
import { colours } from '../constants/colours';

export default class GameOver extends Phaser.State {
    init(levelID) {
        this.levelID = levelID;
    }

    create() {
        let menuOptions;

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Game Over', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        menuOptions = [
            {
                text: 'Replay',
                targetState: `Level${this.levelID}`
            },
            {
                text: 'Main menu',
                targetState: 'MainMenu'
            }
        ];

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuOptions);

        this.menu.create();
    }
}