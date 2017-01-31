import IProgress from '../interfaces/progress.interface';
import Storage from '../helpers/storage.helper';
import colours from '../constants/colours';
import dimensions from '../constants/dimensions';
import newGameProgress from '../constants/new-game-progress';

export default class MainMenu extends Phaser.State {
    create() {
        let localProgress: IProgress,
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

        if (!localProgress) {
            Storage.saveLocalProgress(newGameProgress.area, newGameProgress.party);
        }
    }
}
