function scaleCombatantXP(combatant, xpFactor) {
    combatant.xp *= xpFactor;

    return combatant;
}

export default class Party {
    constructor(name, combatants, xpFactor = null) {
        this.name = name;
        this.combatants = combatants;

        if (xpFactor) {
            let combatant;

            this.combatants.forEach((combatant) => {
                combatant = scaleCombatantXP(combatant, xpFactor);
            }, this);
        }
    }

    addCombatant(combatant) {
        this.combatants.push(combatant);
    }
}
