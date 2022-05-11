let view = {
    updatePlayer(){
       let plrName = document.getElementById("playerName");
       plrName.innerHTML = player.playerName;
    },
    updateMonster(){

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



