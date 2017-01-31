import ICombatant from './combatant.interface';

interface IParty {
    name: string,
    combatants: ICombatant[],
    xpFactor: number
}

export default IParty;
