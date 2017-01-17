import IPrefab from './prefab.interface';
import Direction from '../enums/direction';

interface IPerson {
    prefabData: IPrefab,
    direction: Direction
}

export default IPerson
