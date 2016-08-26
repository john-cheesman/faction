export const defaultPlayerParty = {
    name: 'player',
    combatants: [
        {
            name: 'John',
            x: 128,
            y: 64,
            type: 'Combatant',
            properties: {
                texture: 'shadowSpritesheet',
                job: 'shadow',
                xp: 100,
                equipment: {
                    primaryHand: 'dagger'
                }
            }
        }
    ],
    xpFactor: 1
};
