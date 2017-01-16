/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

import BootState from '../states/boot.state';
import PreloaderState from '../states/preloader.state';
import AreaState from '../states/area.state';
import GameOverState from '../states/game-over.state';
import MainMenuState from '../states/main-menu.state';
import BattleState from '../states/battle.state';
import Utility from '../helpers/utility.helper';
import dimensions from '../constants/dimensions';

export default class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.AUTO, 'gameScreen');

        this.state.add('Boot', BootState);

        this.state.add('Preloader', PreloaderState);

        this.state.add('Area', AreaState);

        this.state.add('MainMenu', MainMenuState);

        this.state.add('GameOver', GameOverState);

        this.state.add('Battle', BattleState);

        this.state.start('Boot', true, false, 'data/game-data.json', 'MainMenu');
    }
};
