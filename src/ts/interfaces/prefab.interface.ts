import GamePlay from '../states/game-play.state';
import ISprite from './sprite.interface';

interface IPrefab {
    spriteData: ISprite,
    gamePlay: GamePlay,
    name: string,
    flipX: boolean,
    flipY: boolean,
    visible: boolean
}

export default IPrefab
