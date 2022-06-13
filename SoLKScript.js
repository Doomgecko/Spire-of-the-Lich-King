//THE SPIRE OF THE LICH KING V2.0
//--Notes on Version 2--
//This version uses a different UI based on one menu rather than submenus.
//The goal is to make the overall UX more smooth and attach the player to the game.
//Other than that slight tweaks will be made to make the code run more smoothly
//and errors from the last version will be fixed.
let attacksObj = {};
let turns = 1;
// document.getElementById("devButton").onclick = function(){
// player.playerAttack = 1000;
// view.updatePlayer();
// }

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
        attackData.open("GET", "actionList.json",false);
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
        document.getElementById("healthBar").style.width = (player.playerHP) + "%";
        document.getElementById("playerMP").innerHTML = "Mana: " + player.playerMP + "/" + player.plrMPMax;
        document.getElementById("manaBar").style.width = (player.playerMP*5) + "%";
        document.getElementById("playerSP").innerHTML = "Stamina: " + player.playerSP + "/" + player.plrSPMax;
        document.getElementById("staminaBar").style.width = (player.playerSP*20) + "%";
        document.getElementById("playerDamage").innerHTML = "Damage <" + player.playerAttack + ">";
        document.getElementById("playerBlock").innerHTML = "Defense (" + player.playerBlock + ")";
    },
    updateMonster(){
        document.getElementById("monsterName").innerHTML = monster.monsterName;
        document.getElementById("monsterHP").innerHTML = "Health: " + monster.monsterHP + "/" + monster.mstrHPMax;
        document.getElementById("mstrHPBar").style.width = (monster.monsterHP) + "%";
        document.getElementById("monsterTelegraph").innerHTML = monster.mstrTelegraph;
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
    gold: 10,
    experience: 10,
    expToLevel: 100,
    attack(){
            if (player.playerSP >= 2) {
                let playerSlash = rollDice(1,6) + player.plrStrength;
                player.playerAttack += playerSlash;
                player.playerSP -= 2;
                view.updatePlayer();
                document.getElementById("errorReport").innerHTML = "You prepare an attack. (Damage +" +
                    playerSlash + ")" + "<br>" +  document.getElementById("errorReport").innerHTML;

            } else {
                document.getElementById("errorReport").innerHTML = "You don't have enough Stamina."
                    + "<br>" +  document.getElementById("errorReport").innerHTML;
            }

    },
    SPAttack(){
        if (player.playerSP >= 3) {
            let playerCleave = rollDice(1, 8) + (player.plrStrength * 1.5);
            player.playerAttack += playerCleave;
            player.playerSP -= 3;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare a mighty strike (Damage +" +
                playerCleave + ")" + "<br>" +  document.getElementById("errorReport").innerHTML;
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina." +
                "<br>" + document.getElementById("errorReport").innerHTML;
        }
    },
    defend(){
        if (player.playerSP >= 3) {
            let playerDefend = rollDice(2,10) + (player.plrEndurance);
            player.playerBlock += playerDefend;
            player.playerSP -= 3;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You ready your shield. (Block +" +
                playerDefend + ")" + "<br>" +  document.getElementById("errorReport").innerHTML;
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina."
                + "<br>" +  document.getElementById("errorReport").innerHTML;
        }
    },
    dodge(){
        if (player.playerSP >= 2) {
            let playerDodge = rollDice(1,6) + (player.plrAgility);
            player.playerBlock += playerDodge;
            player.playerSP -= 2;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You prepare to dodge. (Block +" +
                playerDodge + ")" + "<br>" +  document.getElementById("errorReport").innerHTML;
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough Stamina."
                + "<br>" +  document.getElementById("errorReport").innerHTML;
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
                playerFireball + ")" + "<br>" +  document.getElementById("errorReport").innerHTML;
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources."
                + "<br>" +  document.getElementById("errorReport").innerHTML;
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
            document.getElementById("errorReport").innerHTML = "You channel a mighty bolt! (Damage +"+ bolt +")"
                + "<br>" +  document.getElementById("errorReport").innerHTML;
            }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources."
                + "<br>" +  document.getElementById("errorReport").innerHTML;
        }
    },
    quickWard(){
        if (player.playerSP >= 1 && player.playerMP >= 2) {
            let ward = rollDice(1,8) + (player.plrWit);
            player.playerSP -= 1;
            player.playerMP -= 2;
            player.playerBlock += ward;
            view.updatePlayer();
            document.getElementById("errorReport").innerHTML = "You project a magic ward. (+5 Block)" + "<br>"
                + document.getElementById("errorReport").innerHTML;
        }else{
            document.getElementById("errorReport").innerHTML = "You don't have enough resources."
                + "<br>" +  document.getElementById("errorReport").innerHTML;
        }
    }
}

let monster = {
    monsterName: "Minotaur",
    monsterHP: 0,
    mstrHPMax: 100,
    monsterAttack: 20,
    monsterBlock: 10,
    mstrStrength: 10,
    mstrEndurance: 5,
    monsterActions: ["Attack", "SPAttack", "Defend", "Warcry"],
    mstrTelegraph: "Minotaur is ready to fight!",
    goldDrop: rollDice(5,6),
    expDrop: 15,
    itemDrop: ["Leather Armor", "Minotaur's Axe"]
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
        monster.mstrTelegraph = "The Minotaur lies dead.";
        document.getElementById("endTurn").innerHTML="<div></div>";
        document.getElementById("newGame").innerHTML = "<button id='newGame' type='button' " +
            "onclick='document.location.reload();'>" + "New Game?</button>";
        document.getElementById("rewardScreen").style.display="block";
        document.getElementsByClassName("closeRewards")[0].onclick = function(){
            document.getElementById("rewardScreen").style.display="none";
        }
        window.onclick = function (event){
            if(event.target === document.getElementById("rewardScreen")){
                document.getElementById("rewardScreen").style.display = "none";
            }
        }
        document.getElementById("rewards").innerHTML = "<p> Gold: " + player.gold + "&#160;&#160;&#160;(+" + monster.goldDrop + ")&#160;&#160;&#160;" + (player.gold +monster.goldDrop) +
            "<br>" + "Exp:&#160;&#160;&#160;" + player.experience + "&#160;&#160;&#160;(+" + monster.expDrop + ")&#160;&#160;&#160;" + (player.experience + monster.expDrop) + "/" + player.expToLevel + "<br><br>" +
            "Loot: <br>" +
            monster.itemDrop[0] + " (x1)<br>" +
            monster.itemDrop[1] + " (x1)</p>";
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
            turns++;
            document.getElementById("errorReport").innerHTML = "TURN " + turns + "<br>"
                + document.getElementById("errorReport").innerHTML;
            player.playerSP = player.plrSPMax;
            view.updatePlayer();
            upkeep.monsterAction();
        }


    },
    monsterAction(){
        let actionChoice = 0;
        actionChoice = Math.floor(Math.random()*5);
        if(actionChoice === 0){
            monster.monsterAttack = rollDice(1,8) + (monster.mstrStrength);
            monster.monsterBlock = rollDice (1,4) + (monster.mstrEndurance);
            monster.mstrTelegraph = "Minotaur is preparing to charge!";
        }else if (actionChoice === 1){
            monster.monsterAttack = rollDice(3, 8) + (monster.mstrStrength);
            monster.monsterBlock = 0;
            monster.mstrTelegraph = "Minotaur is readying a mighty strike!";
        }else if (actionChoice === 2){
            monster.monsterAttack = rollDice(1,8);
            monster.monsterBlock = rollDice(1,12) + (Math.floor(monster.mstrEndurance * 1.5));
            monster.mstrTelegraph = "Minotaur is standing resolute!";
        }else if (actionChoice === 3){
            let brutal = Math.floor(Math.random()*2) + 1;
            if(brutal === 1) {
                monster.monsterAttack = rollDice(3, 12) + monster.mstrStrength;
                monster.monsterBlock = 0;
                monster.monsterHP -= rollDice(1,6);
                monster.mstrTelegraph = "Minotaur is preparing a brutal attack!"
            }
        }else if(actionChoice === 4){
            let pumped = rollDice(1,6);
            if (pumped <= 4){
                monster.mstrStrength += 2;
                monster.monsterBlock = rollDice(1,10)  + (monster.mstrEndurance);
                monster.mstrTelegraph = "Minotaur is pumping itself up!"
            }else{
                monster.monsterAttack = rollDice(1,10) + (monster.mstrStrength);
                monster.monsterHP -= rollDice(1,6) + (monster.mstrStrength);
                monster.mstrTelegraph = "Minotaur is enraged!"
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
