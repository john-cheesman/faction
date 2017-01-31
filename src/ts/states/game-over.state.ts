import Menu from '../models/menu';
import Utility from '../helpers/utility.helper';
import dimensions from '../constants/dimensions';
import colours from '../constants/colours';

export default class GameOver extends Phaser.State {
    public levelId: string;
    public menu: Menu;

    init(levelId: string) {
        this.levelId = levelId;
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
                targetState: `Level${this.levelId}`
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
