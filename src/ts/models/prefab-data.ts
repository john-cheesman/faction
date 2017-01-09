import SpriteData from './sprite-data';

export default class PrefabData {
    constructor(
        public spriteData: SpriteData,
        public gameState: Phaser.State,
        public name: string,
        public flipX: boolean = false,
        public flipY: boolean = false,
        public visible: boolean = true
    ) { }
}
