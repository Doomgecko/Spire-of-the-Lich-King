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
    },
    updateMenu(){

    }
}

let combatMenu = {
    attackOption(){
        let menu = document.getElementById("quickMenu");
        menu.innerHTML = "<br><form><button id='slashAttack'>Slash</button><p>Cost: 2 Stamina</p><br>" +
            "<button id='cleaveAttack'>Cleave</button><p>A heavy attack. Cost: 3 Stamina </p><br></form>";
    },
    defendOption(){},
    spellOption(){}

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
