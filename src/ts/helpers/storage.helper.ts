import Equipment from '../models/equipment';
import Combatant from '../models/prefabs/persons/combatant';
import Party from '../models/party';
import Progress from '../models/progress';

export default class StorageHelper {
    static saveParty(party) {
        this.save('FactionPlayerParty', this.mapParty(party));
    }

    static loadParty() {
        let partyData;

        partyData = this.load('FactionPlayerParty');

        return partyData;
    }

    static savePlayerPosition(position) {
        this.save('FactionPlayerPosition', position);
    }

    static loadPlayerPosition() {
        return this.load('FactionPlayerPosition');
    }

    static clearPlayerPosition() {
        localStorage.removeItem('FactionPlayerPosition');
    }

    static saveLocalProgress(progress: Progress) {
        let progressData;

        progressData = {
            area: progress.area
        };

        if (progress.party) {
            progressData.party = this.mapParty(progress.party);
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

    private static mapEquipment(equipment: Equipment) {
        return {
            head: equipment.head ? equipment.head.id : null,
            body: equipment.body ? equipment.body.id : null,
            primaryHand: equipment.primaryHand ? equipment.primaryHand.id : null,
            secondaryHand: equipment.secondaryHand ? equipment.secondaryHand.id : null,
            feet: equipment.feet ? equipment.feet.id : null
        };
    }

    private static mapParty(party: Party) {
        let partyData: any,
            partyMember: Combatant;

        partyData = {
            name: party.name,
            combatants: [],
            xpFactor: party.xpFactor
        };

        party.combatants.forEach((partyMember) => {
            partyData.combatants.push({
                name: partyMember.name,
                x: partyMember.x,
                y: partyMember.y,
                properties: {
                    job: partyMember.job.name,
                    texture: partyMember.textureName,
                    xp: partyMember.xp,
                    equipment: this.mapEquipment(partyMember.equipment)
                }
            });
        });

        return partyData;
    }
}
