import { Menu } from '../menu';
import { colours } from '../../constants/colours';
import { dimensions } from '../../constants/dimensions';

export class MainMenu extends Phaser.State {
    create() {
        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Catacomb', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), [
            {
                text: 'Start',
                callback: () => {
                    this.game.state.start('Boot', true, false, 'data/area/area-1a-data.json', 'Area');
                }
            }
        ]);

        this.menu.create();
    }
}
