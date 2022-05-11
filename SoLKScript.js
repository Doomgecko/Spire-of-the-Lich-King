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

let player = {
    playerName: "Gygax",
    playerHP: 0,
    plrHPMax: 100,
    playerMP: 0,
    plrMPMax: 20,
    playerSP: 0,
    plrSPMax: 5
}

let monster = {
    monsterName: "Minotaur",
    monsterHP: 0,
    mstrHPMax: 100,
    mstrTelegraph: "Minotaur is ready to fight",
    monsterActions: ["Attack", "SPAttack", "Defend", "Warcry"]
}

view.updatePlayer();
view.updateMonster();