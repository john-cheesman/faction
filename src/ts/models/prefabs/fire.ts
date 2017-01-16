import Prefab from '../prefab';
import animations from '../../constants/animations';

export default class Fire extends Prefab {
    create() {
        super.create();

        this.animations.add('flame', animations.fire.flame, 10, true);
        this.animations.play('flame');
    }
}
