import IGamePlay from './game-play.interface';
import IParty from './party.interface';

interface IBattle {
    gamePlayData: IGamePlay,
    groups: string[],
    enemyParty: IParty
}

export default IBattle
