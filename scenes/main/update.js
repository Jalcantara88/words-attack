const words = require("../../assets/words");
const world = require("../../objects/world");

var thisWord;




function wordSelect() {
    thisWord = words[world.level];
}

module.exports = function update() {
    const {player, otherDude} = world;

    otherDude.play('odLeft', true);
    //player.play('left', true);

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