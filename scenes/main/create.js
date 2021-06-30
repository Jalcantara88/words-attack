const world = require("../../objects/world");




module.exports = function create() {


    this.add.image(400, 300, 'sky');

    const player = this.add.player(300,400);

    world.player = this.physics.add.existing(player, { allowGravity: false});

    console.log("player is: " + world.player);
    console.log(world);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    this.physics.world.setBounds(10, 10, 800 - 20, 600 - 20);


}