import PrefabType from '../enums/prefab-type';
import GamePlay from '../states/game-play.state';
import ISprite from './sprite.interface';

interface IPrefab {
    spriteData: ISprite,
    gamePlay: GamePlay,
    name: string,
    type: PrefabType,
    flipX?: boolean,
    flipY?: boolean,
    visible?: boolean,
    group?: string
}

export default IPrefab
