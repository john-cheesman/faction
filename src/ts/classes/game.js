import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { Area } from './states/area';
import { GameOver } from './states/game-over';
import { MainMenu } from './states/main-menu';
import { Battle } from './states/battle';
import { Utility } from './utility';
import { dimensions } from '../constants/dimensions';

export class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.AUTO, 'gameScreen');

        this.state.add('Boot', Boot);

        this.state.add('Preloader', Preloader);

        this.state.add('Area', Area);

        this.state.add('MainMenu', MainMenu);

        this.state.add('GameOver', GameOver);

        this.state.add('Battle', Battle);

        this.state.start('Boot', true, false, 'data/game-data.json', 'MainMenu');
    }
};
