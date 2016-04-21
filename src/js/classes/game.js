import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { GameOver } from './states/game-over';
import { MainMenu } from './states/main-menu';
import { Utility } from './utility';
import { dimensions } from '../config';

export class Game extends Phaser.Game {
    constructor() {
        super(dimensions.gameWidth, dimensions.gameHeight, Phaser.AUTO, 'gameScreen');

        this.state.add('Boot', Boot);

        this.state.add('Preloader', Preloader);

        this.state.add('MainMenu', MainMenu);

        this.state.add('GameOver', GameOver);

        this.state.start('Boot');
    }
};
