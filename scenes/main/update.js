const words = require("../../assets/words");
const world = require("../../objects/world");

var lettLoaded = false;
var enemLoaded = false;

var regenRate = 10;

var thisWord;

var lettHeight = 100;
var lettWidth = 80;
var lettStartX = 0;
var lettStartY = 0;
var lettGap = 5;

function wordSelect() {
    world.word.goal = words[world.level];
    thisWord = world.word.goal;
    console.log(world.word.goal);
}

function findLettStart() {
    const halfWidth = (((lettWidth * thisWord.length) + (lettGap * (thisWord.length - 1)) )/ 2) - (lettWidth / 2);
    console.log(halfWidth);
    lettStartX = 400 - halfWidth;
    lettStartY = 600 - (lettGap + (lettHeight / 2));
}

function loadEnemies() {
    for (i = 0; i < thisWord.length; i++) {
        console.log(i);
    }
}

module.exports = function update(time, delta) {

    //console.log(time);
    var seconds = delta / 1000;

    if((time / 1000) >= 3 && !lettLoaded) {
        wordSelect();
        findLettStart();
        for(i = 0; i < thisWord.length; i++) {
            const xPos = lettStartX + ((i * lettGap) + (i * lettWidth));
            const enemy = this.add.rectangle(xPos ,lettStartY, lettWidth,lettHeight, 0x252525);
            world.letters.add(enemy);
            console.log("generated enemy: " + i);
        }
        lettLoaded = true;

        //loadEnemies();
    }
    

    if(world.health < 100) {
        world.health += (regenRate * seconds);
        var newHp = Math.round(400 * (world.health / 100));
        newHp > 400 ? newHp = 400 : newHp = newHp;
        //console.log(newHeight);
        this.hp.displayHeight = newHp;
        //console.log(this.hp.displayHeight);
    }

    if(world.shield < 100) {
        world.shield += (regenRate * seconds);
        var newSp = Math.round(400 * (world.shield / 100));
        newSp > 400 ? newSp = 400 : newSp = newSp;
        this.sp.displayHeight = newSp;
    }
    

    const {player, otherDude} = world;

    /*
    otherDude.play('odLeft', true);
    player.play('left', true);
    */

    const cursors = this.input.keyboard.createCursorKeys();

    const keys = this.input.keyboard.addKeys('W, A, S, D');

    //console.log(keys);

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