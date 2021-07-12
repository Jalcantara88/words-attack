const words = require("../../assets/words");
const { player, timer } = require("../../objects/world");
const world = require("../../objects/world");

var eFireRate = 2;
var eTimer = 0;

world.loaded = false;

var regenRate = 30;
var drainRate = 70;

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

var scramWord = [];
function scramble() {
    var lettNumArray = [];
    console.log(thisWord);
    for(i = 0; i < thisWord.length; i++) {
        var lettNum = getRandInt(0, (thisWord.length - 1));
        console.log(lettNum);
        do {
            lettNum = getRandInt(0, (thisWord.length - 1));
            console.log(lettNum);
            console.log(lettNumArray);
            console.log("in do loop");
        } while(lettNumArray.find((element) => element === lettNum) !== undefined);
        lettNumArray.push(lettNum);
        scramWord[i] = thisWord[lettNum];
    }
    
}

function loadEnemies(scene) {
    var enemHeight = 200;
    var enemWidth = 200;
    var enemGap = 50;
    var enemStartHeight = 300;

    findStart(enemWidth, enemHeight, enemGap, enemStartHeight);

    for (i = 0; i < thisWord.length; i++) {
        const xPos = startX + (enemWidth * i) + (enemGap * 1);
        const thisLett = scramWord[i];
        const enemy = scene.add.enemy(xPos, startY, thisLett);
        enemy.play("enemyIdle", true);
        
        enemy.body.setBounce(1, 1);
        enemy.body.setFriction(0, 0);
        enemy.body.setImmovable(false);
        enemy.body.setCollideWorldBounds(true);
        enemy.body.stopVelocityOnCollide = false;
        enemy.body.isMoving = true;
        enemy.body.allowDrag = false;
        enemy.body.allowGravity = false;
        console.log(enemy);

        
        world.enemies.add(enemy);
        
    }
}

function loadLetters(scene) {
    var lettHeight = 80;
    var lettWidth = 60;
    var lettGap = 10;
    var lettStartHeight = 570;

    findStart(lettWidth, lettHeight, lettGap, lettStartHeight);
    for(i = 0; i < thisWord.length; i++) {
        const xPos = startX + ((i * lettGap) + (i * lettWidth));
        const letter = scene.add.rectangle(xPos ,startY, lettWidth,lettHeight, 0xfff2d7);
        
        letter.value = scene.add.text(letter.x, letter.y, world.word.goal[i], {font: "50px Arial", color: "black"});
        letter.value.setOrigin(0.5);
        letter.value.setVisible(false);
        letter.setDepth(2);
        letter.value.setDepth(2);
        letter.setVisible(false);
        world.letters.add(letter);
    }
};

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randEnem;

function checkEnemAlive() {
    var enemCount = 0;
    for(i = 0; i < world.word.goal.length; i++) {
        if(world.enemies.children.entries[i].visible) {
            enemCount++;
        }
        else{
            world.enemies.children.entries[i].engine.stop();
        }
    }
    if(enemCount === 0) {
        world.enemAlive = false;
    }
}

function enemShoot(target) {
    if(world.enemAlive) {
        do {
            randEnem = getRandInt(0, (thisWord.length -1));
        } while(!world.enemies.children.entries[randEnem].visible);  
        world.enemies.children.entries[randEnem].laser.play();
        world.enemies.children.entries[randEnem].shoot(target);
    } 
}

function updateBar(bar, value) {
    var newH = Math.round(400 * (value / 100));
    newH > 400 ? newH = 400 : newH = newH;
    newH < 0 ? newH = 0 : newH = newH;
    bar.displayHeight = newH;
}

function resetTimer() {
    world.timer = 0;
    world.countdown = 120;
}

function timerCountDown(delta) {
    const minutes = Math.floor(world.countdown / 60);
    const seconds = Math.floor(world.countdown % 60);
    world.timerTxt.setText(minutes + " : " + seconds);
    world.timer += delta / 1000;
    if(world.countdown > 0) {
        world.countdown = world.setTimer - world.timer;
        if(world.countdown < 0) world.countdown = 0;
    }
    if(world.countdown <= 0) {
        world.lives -= 1;
    }
}

module.exports = function update(time, delta) {
    this.space.tilePositionY -= 0.3;
    this.clouds.tilePositionY -= 0.7;
    this.stars.tilePositionY -= 0.2;

    world.livesTxt.setText(world.lives.toString());
    world.lvlTxt.setText(world.level.toString());

    const {player} = world;
    if(world.timerOn) {
        timerCountDown(delta);
    }

    // load lvl
    if(world.timer >= 3 && !world.loaded) {
        wordSelect();

        scramble();
        
        loadLetters(this);
        
        loadEnemies(this);
                
        world.loaded = true;
    }

    //enemy shoot timer
    if(world.loaded && world.enemies.children.entries && player.alive && world.enemAlive) {
        eTimer += 0.01;
        if(eTimer >= eFireRate) {
            //console.log("shoot");
            enemShoot(player);
            eTimer = 0;
        }
        checkEnemAlive();
    }

    if(!world.enemAlive) {
        world.timerOn = false;
        this.gameWinWindow(true);
    }

    if(world.lives <= 0) {
        player.alive = false;
        world.timerOn = false;
        this.gameOverWindow(true);
    }

    //ui updates
    updateBar(this.hp, world.health);
    updateBar(this.sp, world.shield);  

    //initial health regen

    if(world.health < 100 && !world.hpLoaded) {
        world.health += (regenRate * (delta / 1000)); 
        if(world.health >= 100) {
            world.hpLoaded = true;
        }
    }

    //shield regen
    if(world.shield < 100 && !player.shieldDrain) {
        world.shield += (regenRate * (delta / 1000));
    }

    if(player.shieldDrain) {
        world.shield -= (drainRate * (delta / 1000));
        world.shield < 0 ? world.shield = 0 : world.shield = world.shield;
    }

    const cursors = this.input.keyboard.createCursorKeys();

    const keys = this.input.keyboard.addKeys('W, A, S, D');

    var space = cursors.space;
    var up = keys.W;
    var down = keys.S;
    var left = keys.A;
    var right = keys.D;
    if(up.isUp && down.isUp && right.isUp && left.isUp) {
        player.idle();
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
        if(player.alive) {
            if(world.shield <= 0) {
                player.shield.visible = false;
            }
            else {
                player.shield.visible = true;
            }
    
            player.shieldDrain = true;
        }
        
    }

    if(space.isUp) {
        player.shield.visible = false;
        player.shieldDrain = false;
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