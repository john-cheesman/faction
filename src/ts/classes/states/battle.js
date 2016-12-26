import { Combatant } from '../prefabs/persons/combatant';
import { Party } from '../party';
import { Storage } from '../storage';
import { newGameProgress } from '../../constants/new-game-progress';

export class Battle extends Phaser.State {
    init(battleData) {
        this.battleData = battleData;

        this.map = this.game.add.tilemap(battleData.map.key);

        this.map.addTilesetImage(battleData.map.tilesetImage.name, battleData.map.tilesetImage.key);
    }

    create() {
        let layer,
            enemyCombatant,
            enemyCombatants,
            playerPartyData,
            playerCombatant,
            playerCombatants;

        enemyCombatants = [];
        playerCombatants = [];

        this.layers = {};

        this.map.layers.forEach((layer) => {
            this.layers[layer.name] = this.map.createLayer(layer.name);
        }, this);

        this.layers[this.map.layer.name].resizeWorld();

        this.battleData.enemyParty.combatants.forEach((enemyCombatant) => {
            let combatant;

            enemyCombatant.properties.direction = 'left';

            combatant = new Combatant(this, enemyCombatant.name, enemyCombatant.x, enemyCombatant.y, enemyCombatant.properties);

            enemyCombatants.push(combatant);
            this.game.add.existing(combatant);
        }, this);

        this.enemyParty = new Party(this.battleData.enemyParty.name, enemyCombatants, this.battleData.enemyParty.xpFactor);

        playerPartyData = Storage.loadParty();

        if (!playerPartyData) {
            playerPartyData = Storage.loadLocalProgress().party;
        }

        playerPartyData.combatants.forEach((playerCombatant) => {
            let combatant;

            playerCombatant.properties.direction = 'right';

            combatant = new Combatant(this, playerCombatant.name, playerCombatant.x, playerCombatant.y, playerCombatant.properties);

            combatant.setFollowTarget(enemyCombatants[0]);

            playerCombatants.push(combatant);
            this.game.add.existing(combatant);
        });

        this.playerParty = new Party(playerPartyData.name, playerCombatants, playerPartyData.xpFactor);

        Storage.saveParty(this.playerParty);
    }

    endBattle() {
        Storage.saveParty(this.playerParty);
    }

    get combatants() {
        return Array.prototype.push.apply(this.enemyParty.combatants, this.playerParty.combatants);
    }
}
