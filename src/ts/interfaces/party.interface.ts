import Combatant from '../models/prefabs/persons/combatant.person';

interface IParty {
    name: string,
    combatants: Combatant[],
    xpFactor: number
}

export default IParty;
