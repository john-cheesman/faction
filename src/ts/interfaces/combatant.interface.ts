import IStats from './stats.interface';
import IPerson from './person.interface';
import IEquipment from './equipment.interface';

interface ICombatant {
    personData: IPerson,
    xp: number,
    baseStats: IStats,
    equipment: IEquipment
}

export default ICombatant
