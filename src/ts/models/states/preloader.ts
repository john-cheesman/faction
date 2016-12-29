import { dimensions } from '../../constants/dimensions';
import { animations } from '../../constants/animations';

export default class Preloader extends Phaser.State {
    init(dataObject, nextState) {
        this.dataObject = dataObject;
        this.nextState = nextState;
    }

    preload() {
        let assets,
            assetLoader,
            assetKey,
            asset;

        assets = this.dataObject.assets;

        for (assetKey in assets) {
            if (assets.hasOwnProperty(assetKey)) {
                asset = assets[assetKey];

                switch (asset.type) {
                    case 'image':
                        this.load.image(assetKey, asset.source);
                        break;

                    case 'spritesheet':
                        this.load.spritesheet(assetKey, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin, asset.spacing);
                        break;

                    case 'tilemap':
                        this.load.tilemap(assetKey, asset.source, null, Phaser.Tilemap.TILED_JSON);
                        break;

                    default:
                        console.error(`Unknown asset type: ${asset.type}`);
                }
            }
        }
    }

    create() {
        this.state.start(this.nextState, true, false, this.dataObject);
    }
}
