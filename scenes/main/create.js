const world = require("../../objects/world");




module.exports = function create() {

    pBullets = this.add.group();

    pBullets.enableBody = true;
    //pBullets.physicsBodyType = Phaser.Physics.Arcade;


    this.add.image(400, 300, 'sky');

    const hpHolder = this.add.rectangle(10,300, 20,400, 0x252525);
    this.hp = this.add.rectangle(10,300, 20, 400, 0x80F68A);

    console.log(this.hp.displayHeight);
    const spHolder = this.add.rectangle(790, 300, 20, 400, 0x252525);
    this.sp = this.add.rectangle(790, 300, 20, 400, 0xFFB545);


    world.letters = this.physics.add.group({immovable: true, allowGravity: false});

    const lvlTxt = this.add.text(100, 5, "LVL: 1", {font: "35px Arial"});

    const livesTxt = this.add.text(600, 5, "Lives: 2", {font: "35px Arial"});

    const timerArea = this.add.rectangle(400, 25, 200, 50, 0xff0000);
    
    const timerTxt = this.add.text(340, 5, "0:00:00", {font: "35px Arial"});
    
    const player = this.add.player(300,400);

    world.player = this.add.existing(player);

    
    //console.log(world);
    //const wordArea = this.add.rectangle(400, 560, 400, 80, 0xff0000);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    //player.play('left');

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //otherDude.play('odLeft', true);
    //player.play('left', true);
    //this.physics.world.setBounds(0, 0, 800, 600);


}