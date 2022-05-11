let setup = {
    setupPlayer(){
        player.playerHP = player.plrHPMax;
        player.playerMP = player.plrMPMax;
        player.playerSP = player.plrSPMax;
    },
    setupMonster(){
        monster.monsterHP = monster.mstrHPMax;
    },
    setupMenu(){
        let attackButton = document.getElementById("attackButton");
        let spellButton = document.getElementById("spellButton");
        let defendButton = document.getElementById("defendButton");
        attackButton.onclick = combatMenu.attackOption;
        spellButton.onclick  = combatMenu.spellOption;
        defendButton.onclick = combatMenu.defendOption;
    }
}

let view = {
    updatePlayer(){
       let plrName = document.getElementById("playerName");
       let plrHealth = document.getElementById("playerHP");
       let plrMana = document.getElementById("playerMP");
       let plrStamina = document.getElementById("playerSP");
       plrName.innerHTML = player.playerName;
       plrHealth.innerHTML = "Health: " + player.playerHP + "/" + player.plrHPMax;
       plrMana.innerHTML = "Mana: " + player.playerMP + "/" + player.plrMPMax;
       plrStamina.innerHTML = "Stamina: " + player.playerSP + "/" + player.plrSPMax;
    },
    updateMonster(){
        let mstrName = document.getElementById("monsterName");
        let mstrHealth = document.getElementById("monsterHP");
        let mstrTele = document.getElementById("monsterTelegraph");
        mstrName.innerHTML = monster.monsterName;
        mstrHealth.innerHTML = "Health: " + monster.monsterHP + "/" + monster.mstrHPMax;
        mstrTele.innerHTML = monster.mstrTelegraph;
    }
}

let combatMenu = {
    menu: document.getElementById("quickMenu"),
    attackOption(){
       combatMenu.menu.innerHTML = "<H1>Attacks</H1>" +
            "<form><button id='slashAttack' type='button'>Slash</button><p>Cost: 2 Stamina</p>" +
            "<button id='cleaveAttack' type='button'>Cleave</button><p>A heavy attack. Cost: 3 Stamina </p></form>";
    },
    defendOption(){
        combatMenu.menu.innerHTML = "<H1>Defense</H1>" +
            "<form><button id='blockDefense' type='button'>Block</button><p>Cost: 4 Stamina</p>" +
            "<button id='dodgeDefense' type='button'>Dodge</button><p>A quick manuever. Cost 2 Stamina</p></form>"
    },
    spellOption(){
        combatMenu.menu.innerHTML = "<H1>Spells</H1>" +
            "<form><button id='fireballSpell' type='button'>Fireball</button><p>Unleash a deadly ball of fire. " +
            " Cost: 3 Stamina, 5 Mana</p>" +
            "<button id='lightning' type='button'>Lightning Bolt</button><p>Either deals high damage or fizzles out." +
            " Cost: 5 Stamina, 5 Mana<p/></form>"
    }

}

let player = {
    playerName: "Gygax",
    playerHP: 0,
    plrHPMax: 100,
    playerMP: 0,
    plrMPMax: 20,
    playerSP: 0,
    plrSPMax: 5,
    playerAttack: 0,
    playerBlock: 0
}

let monster = {
    monsterName: "Minotaur",
    monsterHP: 0,
    mstrHPMax: 100,
    monsterAttack: 0,
    monsterBlock: 0,
    monsterActions: ["Attack", "SPAttack", "Defend", "Warcry"],
    mstrTelegraph: "Minotaur is ready to fight"

}

setup.setupPlayer();
setup.setupMonster();
setup.setupMenu()
view.updatePlayer();
view.updateMonster();
