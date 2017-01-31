import IAsset from './asset.interface';
import IMap from './map.interface';

interface IGamePlay {
    name: string,
    assets: IAsset[],
    map: IMap,
    groups: string[]
}

export default IGamePlay
