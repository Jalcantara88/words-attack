const world = require("../../objects/world");




module.exports = function create() {


    //pBullets.enableBody = true;
    //pBullets.physicsBodyType = Phaser.Physics.Arcade;


    this.add.image(400, 300, 'sky');

    const hpHolder = this.add.rectangle(10,300, 20,400, 0x252525);
    this.hp = this.add.rectangle(10,300, 20, 400, 0x80F68A);

    const spHolder = this.add.rectangle(790, 300, 20, 400, 0x252525);
    this.sp = this.add.rectangle(790, 300, 20, 400, 0xFFB545);


    world.letters = this.physics.add.group({immovable: true, allowGravity: false});

    const lvlTxt = this.add.text(100, 5, "LVL: 1", {font: "35px Arial"});

    const livesTxt = this.add.text(600, 5, "Lives: 2", {font: "35px Arial"});

    const timerArea = this.add.rectangle(400, 25, 200, 50, 0xff0000);
    
    world.timerTxt = this.add.text(358, 5, "0:00:00", {font: "35px Arial"});
    
    const player = this.add.player(300,400);

    world.player = this.add.existing(player);

    ///let enemies = this.add.group();

    world.enemies = this.add.group();

    let eBullets = this.add.group({immovable: false, allowGravity: false});

    let pBullets = this.add.group({immovable: false, allowGravity: false});

    world.pBullets = pBullets;
    
    world.eBullets = eBullets;

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
        for(i = 0; i <= world.lettHead; i++) {
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