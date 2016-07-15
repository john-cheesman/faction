import { Enum } from 'enumify';

export class EquipmentType extends Enum {}

EquipmentType.initEnum([
    'Head',
    'Body',
    'OneHanded',
    'TwoHanded',
    'Feet'
]);
