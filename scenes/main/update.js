const words = require("../../assets/words");
const world = require("../../objects/world");

var eFireRate = 2;
var eTimer = 0;

var loaded = false;

var regenRate = 10;

var thisWord;

var startX = 0;
var startY = 0;

function wordSelect() {
    world.word.goal = words[world.level];
    thisWord = world.word.goal;
}

//gives positioning for centered row of objects
function findStart(width, height, gap, top) {
    const halfWidth = (((width * thisWord.length) + (gap * (thisWord.length - 1)) )/ 2) - (width / 2);
    startX = 400 - halfWidth;
    startY = top - (gap + (height / 2));
}
//var lettLeft = thisWord;
var lettNumArray = [];
function chooseLett() {
    var lettNum = getRandInt(0, (thisWord.length - 1));
    while(lettNumArray.find(element => element === lettNum) !== undefined) {
        lettNum = getRandInt(0, (thisWord.length - 1));
        //regex = `^((?!(${lettNum})).)*$`;
    }
    
    lettNumArray.push(lettNum);
    return thisWord[lettNum];
}

function loadEnemies(scene) {
    var enemHeight = 200;
    var enemWidth = 200;
    var enemGap = 50;
    var enemStartHeight = 300;

    findStart(enemWidth, enemHeight, enemGap, enemStartHeight);
    const enemies = scene.add.group({immovable: true, allowGravity: false});

    for (i = 0; i < thisWord.length; i++) {
        const xPos = startX + (enemWidth * i) + (enemGap * 1);
        const thisLett = chooseLett();
        console.log(thisLett);
        const enemy = scene.add.enemy(xPos, startY, thisLett);
        enemies.add(enemy);
    }

    world.enemies = enemies;
}

function loadLetters(scene) {
    var lettHeight = 100;
    var lettWidth = 80;
    var lettGap = 5;
    var lettStartHeight = 600;

    findStart(lettWidth, lettHeight, lettGap, lettStartHeight);
    for(i = 0; i < thisWord.length; i++) {
        const xPos = startX + ((i * lettGap) + (i * lettWidth));
        const letter = scene.add.rectangle(xPos ,startY, lettWidth,lettHeight, 0x252525);
        world.letters.add(letter);
    }
};


function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enemShoot(target) {
    const randEnem = getRandInt(0, (thisWord.length -1));
    //console.log(randEnem);
    world.enemies.children.entries[randEnem].shoot(target);
    //console.log("new enemy shot fired");
}

module.exports = function update(time, delta) {
    const {player} = world;

    //console.log(time);
    var seconds = delta / 1000;

    // start lvl
    if((time / 1000) >= 3 && !loaded) {
        wordSelect();
        
        loadLetters(this);
        
        loadEnemies(this);
                
        loaded = true;
    }
    //console.log("cycle");

    if(loaded) {
        eTimer += 0.01;
        if(eTimer >= eFireRate) {
            //console.log("enemy fired");
            enemShoot(player);
            eTimer = 0;
        }
    }


    
    
    

    


    

    //health regen
    if(world.health < 100) {
        world.health += (regenRate * seconds);
        var newHp = Math.round(400 * (world.health / 100));
        newHp > 400 ? newHp = 400 : newHp = newHp;
        //console.log(newHeight);
        this.hp.displayHeight = newHp;
        //console.log(this.hp.displayHeight);
    }

    //shield regen
    if(world.shield < 100) {
        world.shield += (regenRate * seconds);
        var newSp = Math.round(400 * (world.shield / 100));
        newSp > 400 ? newSp = 400 : newSp = newSp;
        this.sp.displayHeight = newSp;
    }
    
    

    const cursors = this.input.keyboard.createCursorKeys();

    const keys = this.input.keyboard.addKeys('W, A, S, D');

    var space = cursors.space;
    var up = keys.W;
    var down = keys.S;
    var left = keys.A;
    var right = keys.D;

    if(space.isDown) {
        console.log("space is down");
    }
    
    if(up.isDown) {
        player.up();
    }
    if(down.isDown) {
        player.down();
    }
    if(right.isDown) {
        player.right();
    }
    if(left.isDown) {
        
        player.left();
    }
    if(space.isDown) {

    }
    
    this.input.on("pointerdown", function(pointer) {
        if(!player.isShooting) {
            player.isShooting = true;
            player.shoot(pointer);
        }
    })

    this.input.on("pointerup", function() {
        player.isShooting = false;
    })
}