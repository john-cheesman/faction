import { dimensions } from '../constants/dimensions';
import { colours } from '../constants/colours';

export default class Boot extends Phaser.State {
    public dataFile: any;
    public nextState: string;

    init(dataFile: any, nextState: string) {
        this.dataFile = dataFile;
        this.nextState = nextState;
    }

    preload() {
        this.load.text('dataFile', this.dataFile);
    }

    create() {
        let dataText: string,
            dataObject: string;

        dataText = this.game.cache.getText('dataFile');
        dataObject = JSON.parse(dataText);

        this.game.stage.backgroundColor = colours.black;

        //if (!this.game.device.desktop) {
        // this.scale.maxWidth = dimensions.gameWidth;
        // this.scale.maxHeight = dimensions.gameHeight;
        // this.scale.forceLandscape = false;
        // this.scale.forcePortrait = true;
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setScreenSize(true);
        // this.scale.pageAlignHorizontally = true;
        //}

        this.game.state.start('Preloader', true, false, dataObject, this.nextState);
    }
}
