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

export class Storage {
    static saveParty(partyGroup) {
        let partyData,
            partyMember;

        partyData = [];

        partyGroup.forEach((partyMember) => {
            partyData.push({
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

        save('FactionPlayerParty', partyData);
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
        save('FactionLocalProgress', progress);
    }

    static loadLocalProgress() {
        return load('FactionLocalProgress');
    }
}
