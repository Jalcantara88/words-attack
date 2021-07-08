const world = require("../../objects/world");




module.exports = function create() {


    //pBullets.enableBody = true;
    //pBullets.physicsBodyType = Phaser.Physics.Arcade;


    this.space = this.add.tileSprite(400,300, 800, 600, "space");
    //this.add.image(400, 300, 'sky');

    const hpHolder = this.add.rectangle(16,300, 20,400, 0x252525);
    this.hp = this.add.rectangle(16,300, 20, 400, 0x80F68A);

    const spHolder = this.add.rectangle(784, 300, 20, 400, 0x252525);
    this.sp = this.add.rectangle(784, 300, 20, 400, 0xFFB545);


    world.letters = this.physics.add.group({immovable: true, allowGravity: false});

    const lvlTxt = this.add.text(190, 8, "1", {font: "35px Arial"});

    lvlTxt.setDepth(1);

    const livesTxt = this.add.text(591, 8, "2", {font: "35px Arial"});

    livesTxt.setDepth(1);
    const timerArea = this.add.rectangle(400, 25, 200, 50, 0xff0000);
    
    world.timerTxt = this.add.text(336, 17, "00:00", {font: "50px Arial "});
    world.timerTxt.setDepth(1);
    
    const player = this.add.player(400,400);
    //player.setOrigin(0.5);

    world.player = this.add.existing(player);
    //world.player.setOrigin(0.5); 

    //world.player.body.width = player.width/2;
    //world.player.body.x = 0.5;

    ///let enemies = this.add.group();

    world.enemies = this.add.group();

    let eBullets = this.add.group({immovable: false, allowGravity: false});

    let pBullets = this.add.group({immovable: false, allowGravity: false});

    world.pBullets = pBullets;
    
    world.eBullets = eBullets;

    this.uiHud = this.add.image(400,300, "uiHud");

    function flashAnim(sprite) {
        const start = timer;
        do {

            console.log("flashing");
        }while((timer - start) < 4);
    }

    this.physics.add.overlap(world.eBullets, player, hitPlayer);

    function hitPlayer(bullet, player) {
        if(!player.shield.visible){
            //console.log("player hit");
            world.health -= 30;
        }
        bullet.destroy();
        bullet.particles.destroy();
    }

    this.physics.add.overlap(world.pBullets, world.enemies, hitEnemy);

    world.lettHead = 0;

    function resetEnemies() {
        for(i = 0; i < world.word.goal.length; i++) {
            console.log("resestting enemy " + i);
            world.enemies.children.entries[i].setVisible(true);
            world.enemies.children.entries[i].setActive(true);
            world.enemies.children.entries[i].particles.setVisible(true);
            world.enemies.children.entries[i].particles.setActive(true);
            world.enemies.children.entries[i].letter.setVisible(true);
            world.enemies.children.entries[i].letter.setActive(true);
            world.letters.children.entries[i].setVisible(true);
            world.letters.children.entries[i].setActive(true);
        }
        world.lettHead = 0;
        console.log(world.enemies);
    }

    world.enemAlive = true;

    function hitEnemy(bullet, enemy) {
        if(enemy.visible) {
            var nextLett = world.lettHead;
            //console.log(nextLett);
            //console.log(world.word.goal[nextLett]);
            //console.log(world.lettHead);
            if(enemy.char === world.word.goal[nextLett]) {
                world.letters.children.entries[nextLett].setVisible(false);
                enemy.setVisible(false);
                enemy.particles.setVisible(false);
                enemy.letter.setVisible(false);
                //console.log(world.lettHead);
                //console.log(world.word.goal.length);
                
                world.lettHead++;
                //console.log(world.lettHead);
            }
            if(enemy.char !== world.word.goal[nextLett]) {
                resetEnemies();  
            }
            //console.log("hit enemy");
            bullet.destroy();
            bullet.particles.destroy(); 
        } 
    }

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    //player.play('left');

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ship', { start: 6, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('ship', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('ship', { start: 8, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    player.play("idle", true);

    //otherDude.play('odLeft', true);
    //player.play('left', true);
    //this.physics.world.setBounds(0, 0, 800, 600);


}