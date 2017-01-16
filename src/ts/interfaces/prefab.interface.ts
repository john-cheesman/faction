import Area from '../states/area.state';
import ISprite from './sprite.interface';

interface IPrefab {
    spriteData: ISprite,
    area: Area,
    name: string,
    flipX: boolean,
    flipY: boolean,
    visible: boolean
}

export default IPrefab
