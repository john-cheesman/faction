import Combatant from './prefabs/persons/combatant';

function scaleCombatantXP(combatant: Combatant, xpFactor: number) {
    combatant.xp *= xpFactor;

    return combatant;
}

export default class Party {
    constructor(public name: string, public combatants: Combatant[], public xpFactor: number = null) {
        if (xpFactor) {
            let combatant: Combatant;

            this.combatants.forEach((combatant) => {
                combatant = scaleCombatantXP(combatant, xpFactor);
            }, this);
        }
    }

    addCombatant(combatant: Combatant) {
        this.combatants.push(combatant);
    }
}
