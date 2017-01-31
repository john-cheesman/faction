import IEquipment from '../interfaces/equipment.interface';
import IParty from '../interfaces/party.interface';
import IProgress from '../interfaces/progress.interface';
import Equipment from '../models/equipment';
import Combatant from '../models/prefabs/persons/combatant';
import Party from '../models/party';

export default class StorageHelper {
    static saveParty(party: IParty) {
        this.save('FactionPlayerParty', party);
    }

    static loadParty() {
        let partyData;

        partyData = this.load('FactionPlayerParty');

        return <IParty>partyData;
    }

    static savePlayerPosition(position: Phaser.Point) {
        this.save('FactionPlayerPosition', position);
    }

    static loadPlayerPosition() {
        return <Phaser.Point>this.load('FactionPlayerPosition');
    }

    static clearPlayerPosition() {
        localStorage.removeItem('FactionPlayerPosition');
    }

    static saveLocalProgress(area: string, party?: Party) {
        let progressData: IProgress;

        progressData = {
            area: area,
            party: null
        };

        if (party) {
            progressData.party = party.partyData;
        }

        this.save('FactionLocalProgress', progressData);
    }

    static loadLocalProgress() {
        return this.load('FactionLocalProgress');
    }

    private static save(key: string, data: any) {
        let json;

        json = JSON.stringify(data);

        localStorage.setItem(key, json);
    }

    private static load(key: string) {
        let json;

        json = localStorage.getItem(key);

        return JSON.parse(json);
    }
}
