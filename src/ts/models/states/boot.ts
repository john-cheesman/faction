import { dimensions } from '../../constants/dimensions';
import { colours } from '../../constants/colours';

export default class Boot extends Phaser.State {
    init(dataFile, nextState) {
        this.dataFile = dataFile;
        this.nextState = nextState;
    }

    preload() {
        this.load.text('dataFile', this.dataFile);
    }

    create() {
        let dataText,
            dataObject;

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

        this.state.start('Preloader', true, false, dataObject, this.nextState);
    }
}
