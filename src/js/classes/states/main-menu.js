import { Menu } from '../menu';
import { colours, dimensions } from '../../config';

export class MainMenu extends Phaser.State {
    create() {
        this.game.add.text((dimensions.tileSize / 2), (dimensions.tileSize / 2), 'Catacomb', {
            font: '20px Consolas',
            fill: Phaser.Color.getWebRGB(colours.white),
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (dimensions.gameWidth - dimensions.tileSize)
        });

        this.menu = new Menu(this.game, (dimensions.tileSize / 2), (dimensions.tileSize * 5.5), [
            {
                text: 'Start',
                callback: () => {
                    this.game.state.start('Boot', true, false, 'data/area-1a-data.json', 'Area');
                }
            }
        ]);

        this.menu.create();

        this.game.controls = {};

        this.game.controls.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        this.game.controls.joystick = this.game.controls.gamepad.addJoystick(35, 250, 0.5, 'gamepad');

        this.game.controls.button = this.game.controls.gamepad.addButton(270, 250, 0.5, 'gamepad');
    }
}
