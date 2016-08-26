import { Menu } from '../menu';
import { Storage } from '../storage';
import { colours } from '../../constants/colours';
import { dimensions } from '../../constants/dimensions';

export class MainMenu extends Phaser.State {
    create() {
        let localProgress,
            menuItems;

        localProgress = Storage.loadLocalProgress();

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Catacomb', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        menuItems = [
            {
                text: 'Start',
                callback: () => {
                    this.game.state.start('Boot', true, false, 'data/area/area-1a-data.json', 'Area');
                }
            }
        ];

        if (localProgress) {
            menuItems.push({
                text: 'Continue',
                callback: () => {
                    this.game.state.start('Boot', true, false, `data/area/${localProgress.area}-data.json`, 'Area');
                }
            });
        }

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuItems);

        this.menu.create();
    }
}
