function save(key, data) {
    let json;

    json = JSON.stringify(data);

    localStorage.setItem(key, json);
}

function load(key) {
    let json;

    json = localStorage.getItem(key);

    return JSON.parse(json);
}

function mapEquipment(equipment) {
    return {
        head: equipment.head ? equipment.head.id : null,
        body: equipment.body ? equipment.body.id : null,
        primaryHand: equipment.primaryHand ? equipment.primaryHand.id : null,
        secondaryHand: equipment.secondaryHand ? equipment.secondaryHand.id : null,
        feet: equipment.feet ? equipment.feet.id : null
    };
}

function mapParty(party) {
    let partyData,
        partyMember;

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
                equipment: mapEquipment(partyMember.equipment)
            }
        });
    });

    return partyData;
}

export default class Storage {
    static saveParty(party) {
        save('FactionPlayerParty', mapParty(party));
    }

    static loadParty() {
        let partyData;

        partyData = load('FactionPlayerParty');

        return partyData;
    }

    static savePlayerPosition(position) {
        save('FactionPlayerPosition', position);
    }

    static loadPlayerPosition() {
        return load('FactionPlayerPosition');
    }

    static clearPlayerPosition() {
        localStorage.removeItem('FactionPlayerPosition');
    }

    static saveLocalProgress(progress) {
        let progressData;

        progressData = {
            area: progress.area
        };

        if (progress.party) {
            progressData.party = mapParty(progress.party);
        }

        save('FactionLocalProgress', progressData);
    }

    static loadLocalProgress() {
        return load('FactionLocalProgress');
    }
}
