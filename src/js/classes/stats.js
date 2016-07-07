export class Stats {
    constructor(stats) {
        this.strength = stats.strength;
        this.vitality = stats.vitality;
        this.agility = stats.agility;
        this.intelligence = stats.intelligence;
    }

    get hitPoints()
    {
        return this.vitality * 4;
    }

    get defence()
    {
        return (this.vitality + this.strength) / 2;
    }

    get evasion()
    {
        return (this.agility + this.intelligence) / 4;
    }

    get accuracy()
    {
        return (this.intelligence + this.vitality) / 2;
    }

    get speed()
    {
        return (this.agility + this.vitality) / 2;
    }

    static calculateCurrentStats(baseStats, level){
        let stats;

        stats = new Stats({
            strength: level * ((baseStats.strength * 25.5) / 99),
            vitality: level * ((baseStats.vitality * 25.5) / 99),
            agility: level * ((baseStats.agility * 25.5) / 99),
            intelligence: level * ((baseStats.intelligence * 25.5) / 99)
        });

        return stats;
    }
}
