import Area from '../states/area';
import SpriteData from './sprite-data';

export default class PrefabData {
    constructor(
        public spriteData: SpriteData,
        public area: Area,
        public name: string,
        public flipX: boolean = false,
        public flipY: boolean = false,
        public visible: boolean = true
    ) { }
}
