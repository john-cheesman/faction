export default class SpriteData {
    constructor(
        public game: Phaser.Game,
        public x: number,
        public y: number,
        public texture: string,
        public frame: number
    ) { }
}
