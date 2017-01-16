import Area from '../states/area';
import ISprite from './i-sprite';

interface IPrefab {
    spriteData: ISprite,
    area: Area,
    name: string,
    flipX: boolean,
    flipY: boolean,
    visible: boolean
}

export default IPrefab
