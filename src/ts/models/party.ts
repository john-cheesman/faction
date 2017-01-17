import IParty from '../interfaces/party.interface';
import Combatant from './prefabs/persons/combatant';

export default class Party {
    private _partyData: IParty;

    constructor(partyData: IParty) {
        this._partyData = partyData;
    }

    get name() {
        return this._partyData.name;
    }

    get combatants() {
        let combatants: Combatant[];

        if (this._partyData.xpFactor) {
            this._partyData.combatants.forEach((combatant) => {
                combatants.push(this.scaleCombatantXP(combatant, this._partyData.xpFactor));
            }, this);
        }
        else {
            combatants = this._partyData.combatants;
        }

        return combatants;
    }

    addCombatant(combatant: Combatant) {
        this._partyData.combatants.push(combatant);
    }

    private scaleCombatantXP(combatant: Combatant, xpFactor: number) {
        combatant.xp *= xpFactor;

        return combatant;
    }
}
