/*Helper functions*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function powers() {
    let powers = [];
    let value = 2.0;
    for (let i = 0; i < 31; i++) {
        powers.push(round1Decimal(value));
        value += 0.1;
    }
    return powers;
}

function speeds() {
    let speeds = [];
    let value = 1.0;
    for (let i = 0; i < 4100; i++) {
        speeds.push(Math.round((value + Number.EPSILON) * 100) / 100);
        value += 0.01;
    }
    return speeds;
}

function round1Decimal(value) {
    return Math.round((value + Number.EPSILON) * 10) / 10;
}
/*Helper functions end*/

class Person {
    constructor(name) {
        this.name = name;
    }
}

class Gladiator extends Person {
    constructor(name) {
        super(name);
        this.initialHealth = getRandomInt(80, 100);
        this.power = powers()[Math.floor(Math.random() * powers().length)]
        this.initialSpeed = speeds()[Math.floor(Math.random() * powers().length)]
        this.speed = this.initialSpeed; //current
        this.health = this.initialHealth; //current
    }

    interval = 5 - this.speed + 1;

    hit(gladiator) {
        // setTimeout(() => {
        //     gladiator.health = gladiator.health - this.power;
        //     console.log(this.name + ' hits ' + gladiator.name + ' with power ' + this.power);
        // }, this.interval*1000);
        gladiator.health = round1Decimal(gladiator.health - this.power);
        console.log(this.name + ' hits ' + gladiator.name + ' with power ' + this.power);

    }

    recover() {
        this.health = this.health + 50;
    }

    isKilled(decision) {
        if (decision === "Kill" && this.health <= 0) {
            return true;
        } else if (decision !== "Kill" && this.health <= 0) {
            this.health = 30;
            return false;
        } else {
            return false;
        }
    }
}

class Caesar extends Person {
    constructor(name) {
        super(name);
    }

    decisions = ["Live", "Kill"];

    makeDecision() {
        return this.decisions[Math.floor(Math.random() * this.decisions.length)];
    }
}

let arena = [];
const caesar = new Caesar("Julius Caesar");

function start() {
    let g1 = new Gladiator("Maximus");
    let g2 = new Gladiator("Augustus");
    let g3 = new Gladiator("Cassius");
    let g4 = new Gladiator("Decimus");
    let g5 = new Gladiator("Claudius");
    let g6 = new Gladiator("Flavius");

    arena.push(g1);
    arena.push(g2);
    arena.push(g3);
    arena.push(g4);
    arena.push(g5);
    arena.push(g6);

    console.log("Welcome Rome, Coliseum!!")
    console.log("There are " + arena.length + " Gladiators" + "\n")
    console.log(g1.name + ", Health: " + g1.health);
    console.log(g2.name + ", Health: " + g2.health);
    console.log(g3.name + ", Health: " + g3.health);
    console.log(g4.name + ", Health: " + g4.health);
    console.log(g5.name + ", Health: " + g5.health);
    console.log(g6.name + ", Health: " + g6.health);
    console.log("\n")
    randomFight();
}


function randomFight() {
    let isBattleEnded = false;
    if (arena.length === 1) {
        console.log(arena[0].name + " won the BATTLE");
        return;
    }

    let arr1 = arena.slice() // copy array
    let arr2 = arena.slice(); // copy array again

    arr1.sort(function () {
        return 0.5 - Math.random();
    }); // shuffle arrays
    arr2.sort(function () {
        return 0.5 - Math.random();
    });

    while (arr1.length) {

        let attackingGladiator = arr1.pop();
        let defendingGladiator = arr2[0] === attackingGladiator ? arr2.pop() : arr2.shift();

        while (!defendingGladiator.isKilled(caesar.makeDecision())) {
            attackingGladiator.hit(defendingGladiator);
            console.log(defendingGladiator.name + "'s health is " + defendingGladiator.health + "\n");
            if (defendingGladiator.health <= 30) {
                defendingGladiator.speed *= 3;
            }
            if (defendingGladiator.health <= 0) {
                console.log(defendingGladiator.name + " is dying");
                if (caesar.makeDecision() === "Live") {
                    console.log(caesar.name + " showed LIVE");
                    defendingGladiator.recover();
                    console.log(defendingGladiator.name + " continues fighting with health " + defendingGladiator.health + "\n");
                } else {
                    console.log(caesar.name + " showed KILL");
                    console.log(defendingGladiator.name + " is DEAD")
                    arena.splice(arena.indexOf(defendingGladiator), 1);//remove died gladiator
                }
            }
            randomFight();
            if (arena.length === 1) {
                isBattleEnded = true;
                return;
            }
        }
    }
    if (isBattleEnded) {
        console.log(arena[0].name + " won the BATTLE")
    }
}


start();
