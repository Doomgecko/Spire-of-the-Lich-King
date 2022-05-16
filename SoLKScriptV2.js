//THE SPIRE OF THE LICH KING V2.0
//--Notes on Version 2--
//This version uses a different UI based on one menu rather than submenus.
//The goal is to make the overall UX more smooth and attach the player to the game.
//Other than that slight tweaks will be made to make the code run more smoothly
//and errors from the last version will be fixed.
let attacksObj = {};
let setup = {
    setupPlayer(){
        player.playerHP = player.plrHPMax;
        player.playerMP = player.plrMPMax;
        player.playerSP = player.plrSPMax;
        let attackData = new XMLHttpRequest();
        attackData.onreadystatechange = function (){
            if (this.readyState === 4 && this.status === 200){
                attacksObj = JSON.parse(this.responseText);
            }
        }
        attackData.open("GET", "attackStats.json",false);
        attackData.send();
    },
    setupMonster(){
        monster.monsterHP = monster.mstrHPMax;
    },
    setupMenu(){
        document.getElementById("endTurn").onclick = upkeep.processTurn;
    }
}

let view = {
    updatePlayer(){
        document.getElementById("playerName").innerHTML = player.playerName;
        document.getElementById("playerHP").innerHTML = "Health: " + player.playerHP + "/" + player.plrHPMax;
        document.getElementById("playerMP").innerHTML = "Mana: " + player.playerMP + "/" + player.plrMPMax;
        document.getElementById("playerSP").innerHTML = "Stamina: " + player.playerSP + "/" + player.plrSPMax;
        document.getElementById("playerDamage").innerHTML = "Damage <" + player.playerAttack + ">";
        document.getElementById("playerBlock").innerHTML = "Defense (" + player.playerBlock + ")";
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
    attackMenu: document.getElementById("attackMenu"),
    defenseMenu: document.getElementById("defenseMenu"),
    spellMenu: document.getElementById("spellMenu"),
    generateAttacks(){
        combatMenu.attackMenu.innerHTML +=  "<form><button id='slashAttack' type='button'>Slash</button><p>Cost: 2 Stamina</p>" +
            "<button id='cleaveAttack' type='button'>Cleave</button><p>A heavy attack. Cost: 3 Stamina </p></form>";
        document.getElementById("slashAttack").onclick = player.attack;
        document.getElementById("cleaveAttack").onclick = player.SPAttack;
    },
    generateDefense(){
        combatMenu.defenseMenu.innerHTML +=  "<form><button id='blockDefense' type='button'>Block</button><p>Cost: 4 Stamina</p>" +
            "<button id='dodgeDefense' type='button'>Dodge</button><p>A quick manuever. Cost 2 Stamina</p></form>";
        document.getElementById("blockDefense").onclick = player.defend;
        document.getElementById("dodgeDefense").onclick = player.dodge;
    },
    generateSpells(){
        combatMenu.spellMenu.innerHTML += "<form><button id='fireballSpell' type='button'>Fireball</button><p>Unleash a deadly ball of fire. " +
            " Cost: 3 Stamina, 5 Mana</p>" +
            "<button id='lightningSpell' type='button'>Lightning Bolt</button><p>Either deals high damage or fizzles out." +
            " Cost: 5 Stamina, 5 Mana</p>" +
            "<button id='wardSpell' type='button'>Quick Ward</button><p>Creates a quick shield. " +
            "Cost: 1 Stamina, 2 Mana</p></form>";
        document.getElementById("fireballSpell").onclick = player.fireball;
        document.getElementById("lightningSpell").onclick = player.lightningBolt;
        document.getElementById("wardSpell").onclick = player.quickWard;
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
    playerBlock: 0,
    attack(){
            if (player.playerSP >= 2) {
                player.playerAttack += 5;
                player.playerSP -= 2;
                view.updatePlayer();
                document.getElementById("errorReport").innerHTML = "You prepare an attack. (Damage +5)";

            } else {
                document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
            }

    },
    SPAttack(){
        if (player.playerSP >= 3) {
            player.playerAttack += 15;
            player.playerSP -= 3;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare a mighty strike (Damage +15)";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    defend(){
        if (player.playerSP >= 4) {
            player.playerBlock += 15;
            player.playerSP -= 4;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You ready your shield. (+20 Block)";
        }else{
            document.getElementById("errorReport").innerHTML = ""
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    dodge(){
        if (player.playerSP >= 2) {
            player.playerBlock += 5;
            player.playerSP -= 2;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare to dodge. (+10 Block)";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    fireball(){
        if (player.playerSP >= 3 && player.playerMP >= 5){
            player.playerAttack += 25;
            player.playerSP -= 3;
            player.playerMP -= 5;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You begin channeling a fireball! (Damage +25)";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources.";
        }
    },
    lightningBolt(){
        if (player.playerSP >= 5 && player.playerMP >= 5){
            let bolt = Math.floor(Math.random()*5);
            player.playerSP -= 5;
            player.playerMP -= 5;
            if (bolt > 2){
                player.playerAttack += 40;
                view.updatePlayer();
                document.getElementById("errorReport").innerHTML = "You channel a mighty bolt! (Damage +40)";
            }else{
                player.playerAttack += 1;
                view.updatePlayer();
                document.getElementById("errorReport").innerHTML = "The bolt fizzles into a spark. (Damage +1)";
            }
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources.";
        }
    },
    quickWard(){
        if (player.playerSP >= 1 && player.playerMP >= 2) {
            player.playerSP -= 1;
            player.playerMP -= 2;
            player.playerBlock += 5;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You project a magic ward. (+5 Block)";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources.";
        }
    }
}

let monster = {
    monsterName: "Minotaur",
    monsterHP: 0,
    mstrHPMax: 100,
    monsterAttack: 20,
    monsterBlock: 10,
    monsterActions: ["Attack", "SPAttack", "Defend", "Warcry"],
    mstrTelegraph: "Minotaur is ready to fight!"

}

let upkeep = {
    processTurn(){
        if (monster.monsterHP <= 1){
            document.getElementById("errorReport").innerHTML = "You have defeated the minotaur! Congrats!";
            monster.monsterName = "Dead";
            monster.monsterHP = "x/";
            monster.mstrTelegraph = "The Minotaur lies dead."
            view.updateMonster();
        }else{
            if (player.playerAttack > monster.monsterBlock) {
                monster.monsterHP -= (player.playerAttack - monster.monsterBlock);
            }
            if (monster.monsterAttack > player.playerBlock) {
                player.playerHP -= (monster.monsterAttack - player.playerBlock);
            }
            player.playerAttack = 0;
            player.playerBlock = 0;
            player.playerSP = player.plrSPMax;
            document.getElementById("errorReport").innerHTML = "";
            view.updatePlayer();
            upkeep.monsterAction();
        }


    },
    monsterAction(){
        let actionChoice = 0;
        actionChoice = Math.floor(Math.random()*3);
        if(actionChoice === 1){
            monster.monsterAttack = 10;
            monster.monsterBlock = 5;
            monster.mstrTelegraph = "Minotaur is preparing to charge!"
        }else if (actionChoice === 2){
            monster.monsterAttack = 25;
            monster.monsterBlock = 0;
            monster.mstrTelegraph = "Minotaur is readying a mighty strike!"
        }else if (actionChoice === 3){
            monster.monsterAttack = 5;
            monster.monsterBlock = 25;
            monster.mstrTelegraph = "Minotaur is standing resolute!"
        }
        view.updateMonster();
    }
}

setup.setupPlayer();
setup.setupMonster();
setup.setupMenu()
view.updatePlayer();
view.updateMonster();
combatMenu.generateAttacks();
combatMenu.generateDefense();
combatMenu.generateSpells();
