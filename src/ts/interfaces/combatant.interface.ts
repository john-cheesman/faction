import IPerson from './person.interface';
import IEquipment from './equipment.interface';

interface ICombatant {
    personData: IPerson,
    xp: number,
    job: string,
    equipment: IEquipment
}

export default ICombatant
