import IParty from '../interfaces/party.interface';
import ICombatant from '../interfaces/combatant.interface';
import IBattle from '../interfaces/battle.interface';
import GamePlay from './game-play.state';
import Combatant from '../models/prefabs/persons/combatant';
import Party from '../models/party';
import Storage from '../helpers/storage.helper';
import newGameProgress from '../constants/new-game-progress';

export default class Battle extends GamePlay {
    public battleData: IBattle;
    public playerParty: Party;
    public enemyParty: Party;

    init(battleData: any) {
        super.init(battleData.gamePlayData);

        this.battleData = <IBattle>battleData;
    }

    create() {
        let layer,
            enemyCombatant,
            enemyCombatants: Combatant[],
            playerPartyData: IParty,
            playerCombatant,
            playerCombatants: Combatant[];

        enemyCombatants = [];
        playerCombatants = [];

        this.layers[0].resizeWorld();

        this.battleData.enemyParty.combatants.forEach((enemyCombatant) => {
            let combatant;

            enemyCombatant.properties.direction = 'left';

            combatant = new Combatant(enemyCombatant);

            enemyCombatants.push(combatant);
            this.game.add.existing(combatant);
        }, this);

        this.enemyParty = new Party(this.battleData.enemyParty);

        playerPartyData = <IParty>Storage.loadParty();

        if (!playerPartyData) {
            playerPartyData = Storage.loadLocalProgress().party;
        }

        playerPartyData.combatants.forEach((playerCombatant) => {
            let combatant;

            playerCombatant.personData.direction = 'Right';

            combatant = new Combatant(playerCombatant);

            //combatant.setFollowTarget(enemyCombatants[0]);

            playerCombatants.push(combatant);
            this.game.add.existing(combatant);
        });

        this.playerParty = new Party(playerPartyData);

        Storage.saveParty(this.playerParty);
    }

    endBattle() {
        Storage.saveParty(this.playerParty);
    }

    get combatants() {
        return Array.prototype.push.apply(this.enemyParty.combatants, this.playerParty.combatants);
    }
}
