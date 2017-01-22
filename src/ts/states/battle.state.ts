import IBattle from '../interfaces/battle.interface';
import GamePlay from './game-play.state';
import Combatant from '../models/prefabs/persons/combatant';
import Party from '../models/party';
import Storage from '../helpers/storage.helper';
import newGameProgress from '../constants/new-game-progress';

export default class Battle extends GamePlay {
    public battleData: IBattle;

    init(battleData: any) {
        super.init(battleData.gamePlayData);

        this.battleData = <IBattle>battleData;
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
