import Menu from '../menu';
import Storage from '../storage';
import Progress from '../progress';
import { colours } from '../../constants/colours';
import { dimensions } from '../../constants/dimensions';
import { newGameProgress } from '../../constants/new-game-progress';

export default class MainMenu extends Phaser.State {
    create() {
        let localProgress: Progress,
            menuItems,
            newGameLocalProgress;

        localProgress = Storage.loadLocalProgress();

        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Faction', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.game.add.button(100, 100, 'uiSpritesheet', () => { this.game.state.start('Boot', true, false, 'data/area/area-1a-data.json', 'Area'); }, this, 1, 1, 1, 1);

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
        else {
            newGameLocalProgress = new Progress(newGameProgress.area, newGameProgress.party);

            Storage.saveLocalProgress(newGameLocalProgress);
        }

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), menuItems);

        this.menu.create();
    }
}
