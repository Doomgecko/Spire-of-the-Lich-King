//THE SPIRE OF THE LICH KING V2.0
//--Notes on Version 2--
//This version uses a different UI based on one menu rather than submenus.
//The goal is to make the overall UX more smooth and attach the player to the game.
//Other than that slight tweaks will be made to make the code run more smoothly
//and errors from the last version will be fixed.
let attacksObj = {};
function randInt(low, high){
    return (Math.floor(Math.random() * high) + low);
}
function rollDice(count, sides){
    let rollTotal = 0;
    for( let i = 0; i < count; i++){
        rollTotal += randInt(1, sides);
    }
    return rollTotal;
}
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
        document.getElementById("playerHP").style.width = (player.playerHP) + "%";
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
        combatMenu.defenseMenu.innerHTML +=  "<form><button id='blockDefense' type='button'>Block</button><p>Cost: 3 Stamina</p>" +
            "<button id='dodgeDefense' type='button'>Dodge</button><p>A quick manuever. Cost 2 Stamina</p></form>";
        document.getElementById("blockDefense").onclick = player.defend;
        document.getElementById("dodgeDefense").onclick = player.dodge;
    },
    generateSpells(){
        combatMenu.spellMenu.innerHTML += "<form><button id='fireballSpell' type='button'>Fireball</button><p>Unleash a deadly ball of fire, but take some damage. " +
            " Cost: 3 Stamina, 5 Mana</p>" +
            "<button id='lightningSpell' type='button'>Lightning Bolt</button><p>Either deals high damage or fizzles out." +
            " Cost: 5 Stamina, 4 Mana</p>" +
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
    plrStrength: 6,
    plrAgility: 6,
    plrEndurance: 6,
    plrWit: 6,
    plrSpirit: 0,
    playerAttack: 0,
    playerBlock: 0,
    attack(){
            if (player.playerSP >= 2) {
                let playerSlash = rollDice(1,6) + player.plrStrength;
                player.playerAttack += playerSlash;
                player.playerSP -= 2;
                view.updatePlayer();
                document.getElementById("errorReport").innerHTML = "You prepare an attack. (Damage +" +
                    playerSlash + ")";

            } else {
                document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
            }

    },
    SPAttack(){
        if (player.playerSP >= 3) {
            let playerCleave = rollDice(1, 12) + (player.plrStrength * 1.5);
            player.playerAttack += playerCleave;
            player.playerSP -= 3;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare a mighty strike (Damage +" +
                playerCleave + ")";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    defend(){
        if (player.playerSP >= 3) {
            let playerDefend = rollDice(2,8) + (player.plrEndurance);
            player.playerBlock += playerDefend;
            player.playerSP -= 3;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You ready your shield. (Block +" +
                playerDefend + ")";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    dodge(){
        if (player.playerSP >= 2) {
            let playerDodge = rollDice(1,6) + (player.plrAgility);
            player.playerBlock += playerDodge;
            player.playerSP -= 2;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare to dodge. (Block +" +
                playerDodge + ")";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina.";
        }
    },
    fireball(){
        if (player.playerSP >= 3 && player.playerMP >= 5){
            let playerFireball = rollDice(1,12) +(player.plrWit * 2);
            let burn = rollDice(1,6);
            player.playerAttack += playerFireball;
            player.playerHP -= burn;
            player.playerSP -= 3;
            player.playerMP -= 5;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You begin channeling a fireball! (Damage +" +
                playerFireball + ")";
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources.";
        }
    },
    lightningBolt(){
        if (player.playerSP >= 5 && player.playerMP >= 4){
            let bolt = (Math.floor(Math.random()*9) + 1);
            let arc = 0
            player.playerSP -= 5;
            player.playerMP -= 4;
            while(arc !== 1){
                arc = Math.floor(Math.random()*5);
                bolt += rollDice(1,6);
                if(bolt >= 50){
                    bolt = 50;
                }
            }
            player.playerAttack += bolt;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You channel a mighty bolt! (Damage +"+ bolt +")";
            }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources.";
        }
    },
    quickWard(){
        if (player.playerSP >= 1 && player.playerMP >= 2) {
            let ward = rollDice(1,6) + (player.plrWit);
            player.playerSP -= 1;
            player.playerMP -= 2;
            player.playerBlock += ward;
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
    mstrStrength: 5,
    mstrEndurance: 5,
    monsterActions: ["Attack", "SPAttack", "Defend", "Warcry"],
    mstrTelegraph: "Minotaur is ready to fight!"

}

let upkeep = {
    checkLoss(){
        document.getElementById("errorReport").innerHTML = "You Died...";
        document.getElementById("restart").innerHTML = "<button id='tryAgain' type='button' " +
            "onclick='document.location.reload();'>" + "Try Again?</button>";
        document.getElementById("endTurn").innerHTML = "<div></div>"
        player.playerHP = 0;
        view.updatePlayer();
    },
    checkWin(){
        document.getElementById("errorReport").innerHTML = "You have defeated the minotaur! Congrats!";
        monster.monsterName = "Dead";
        monster.monsterHP = 0;
        monster.mstrTelegraph = "The Minotaur lies dead."
        view.updateMonster();},
    processTurn(){
        if (monster.monsterHP < 1){
            upkeep.checkWin();
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
        actionChoice = Math.floor(Math.random()*4);
        if(actionChoice === 0){
            monster.monsterAttack += rollDice(1,10) + (monster.mstrStrength);
            monster.monsterBlock += rollDice (1,4) + (monster.mstrEndurance);
            monster.mstrTelegraph = "Minotaur is preparing to charge!";
        }else if (actionChoice === 1){
            monster.monsterAttack = rollDice(2, 12) + (monster.mstrStrength);
            monster.monsterBlock = 0;
            monster.mstrTelegraph = "Minotaur is readying a mighty strike!";
        }else if (actionChoice === 2){
            monster.monsterAttack = rollDice(1,6);
            monster.monsterBlock = rollDice(1,12) + (Math.floor(monster.mstrEndurance * 1.5));
            monster.mstrTelegraph = "Minotaur is standing resolute!";
        }else if (actionChoice === 3){
            let brutal = Math.floor(Math.random()*2) + 1;
            if(brutal === 1) {
                monster.monsterAttack = rollDice(3, 12);
                monster.monsterBlock = 0;
                monster.monsterHP -= rollDice(1,6);
                monster.mstrTelegraph = "Minotaur is preparing a brutal attack!"
            }
        }
        view.updateMonster();
        if(monster.monsterHP < 1){
            upkeep.checkWin();
        }
        if(player.playerHP < 1){
            upkeep.checkLoss();
        }
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
