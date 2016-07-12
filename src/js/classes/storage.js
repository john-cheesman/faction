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
                    xp: partyMember.xp
                }
            });
        });

        save('FactionPartyData', partyData);
    }

    static loadParty() {
        let partyData;

        partyData = load('FactionPartyData');

        return partyData;
    }
}
