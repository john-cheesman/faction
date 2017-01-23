import AssetType from '../enums/asset-type';

interface IAsset {
    type: AssetType,
    source: string,
    frameWidth?: number,
    frameHeight?: number,
    frames?: number
}

export default IAsset
