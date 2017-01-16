import Combatant from '../models/prefabs/persons/combatant';

interface IParty {
    name: string,
    combatants: Combatant[],
    xpFactor: number
}

export default IParty;
