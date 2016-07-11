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
            player;

        partyData = [];

        partyGroup.forEach((player) => {
            partyData.push({
                name: player.name,
                x: player.x,
                y: player.y,
                properties: {
                    job: player.job.name,
                    texture: 'shadowSpritesheet',
                    xp: player.xp
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
