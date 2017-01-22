import IGamePlay from './game-play.interface';
import IPerson from './person.interface';
import IParty from './party.interface';

interface IArea {
    gamePlayData: IGamePlay,
    groups: string[],
    player: IPerson,
    party: IParty
}

export default IArea
