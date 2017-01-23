import IEnemy from '../../../interfaces/enemy.interface';
import Person from '../person';

export default class Enemy extends Person {
    constructor(enemyData: IEnemy) {
        super(enemyData.personData);

        this.battle = enemyData.battle;
    }

    public battle: string;

    interact() {
        this.gamePlay.game.state.start('Boot', true, false, `data/battle/${this.battle}-data.json`, 'Battle');
    }
}
