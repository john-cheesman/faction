import ICombatant from '../interfaces/combatant.interface';
import IParty from '../interfaces/party.interface';
import Combatant from './prefabs/persons/combatant';

export default class Party {
    constructor(public partyData: IParty) { }

    get name() {
        return this.partyData.name;
    }

    get combatants() {
        let combatants: Combatant[];

        this.partyData.combatants.forEach((combatant) => {

            if (this.partyData.xpFactor) {
                combatant = this.scaleCombatantXP(combatant, this.partyData.xpFactor);
            }

            combatants.push(new Combatant(combatant));
        }, this);

        return combatants;
    }

    get xpFactor() {
        return this.partyData.xpFactor;
    }

    addCombatant(combatant: ICombatant) {
        this.partyData.combatants.push(combatant);
    }

    private scaleCombatantXP(combatant: ICombatant, xpFactor: number) {
        combatant.xp *= xpFactor;

        return combatant;
    }
}
