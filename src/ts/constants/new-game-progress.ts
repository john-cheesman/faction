import IProgress from '../interfaces/progress.interface';

const newGameProgress: IProgress = {
    area: 'area-1a',
    party: {
        name: 'player',
        combatants: [
            {
                personData: {
                    prefabData: {
                        spriteData: {
                            x: 128,
                            y: 64,
                            texture: 'shadowSpritesheet'
                        },
                        name: 'John',
                        type: 'Combatant'
                    },
                    direction: 'Down'
                },
                xp: 100,
                baseStats: {
                    strength: 8,
                    vitality: 7,
                    agility: 8,
                    intelligence: 3
                },
                equipment: {
                    primaryHand: {
                        itemData: {
                            id: 'dagger',
                            name: 'Dagger',
                            description: 'A short, double edge blade',
                            baseValue: 20
                        },
                        derivedStats: {
                            attack: 20,
                            defence: 0,
                            evasion: 5,
                            accuracy: 0,
                            speed: 0
                        },
                        equipmentType: 'OneHanded'
                    }
                }
            }
        ],
        xpFactor: null
    }
};

export default newGameProgress
