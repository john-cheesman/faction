import IPrefab from './prefab.interface';
import ICoordinate from './coordinate.interface';

interface IExit {
    prefabData: IPrefab,
    targetArea: string,
    hidden: boolean,
    targetCoords: ICoordinate
}

export default IExit
