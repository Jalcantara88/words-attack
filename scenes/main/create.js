const world = require("../../objects/world");

module.exports = function create() {
    this.gameMusic = this.sound.add('gameMusic', { volume: 0.2, loop: true });
    this.gameMusic.play();

    this.window = this.add.image(400, 300, "window");
    this.window.setDepth(3);
    this.window.setAlpha(0.5);
    this.window.setVisible(false);
    this.retryBtn = this.add.image(250, 450, "retryBtn").setInteractive();
    this.retryBtn.setDepth(3);
    this.retryBtn.setVisible(false);
    this.quitBtn = this.add.image(550, 450, "quitBtn").setInteractive();
    this.quitBtn.setDepth(3);
    this.quitBtn.setVisible(false);
    this.continueBtn = this.add.image(250, 450, "continueBtn").setInteractive();
    this.continueBtn.setDepth(3);
    this.continueBtn.setVisible(false);
    this.gameOver = this.add.image(400, 250, "gameOver");
    this.gameOver.setDepth(3);
    this.gameOver.setVisible(false);
    this.gameWin = this.add.image(400, 250, "gameWin");
    this.gameWin.setDepth(3);
    this.gameWin.setVisible(false);
    

    function resetGame() {
        world.timer = 0;
        world.loaded = false; 
        world.hpLoaded = false;
        world.enemAlive = true;
        world.enemies.clear();
        world.letters.clear();
        world.player.alive = true;
        world.player.setVisible(true);
        world.lives = 1;
        world.timerOn = true;
    }

    this.quitBtn.on('pointerdown', function(pointer) {
        this.gameMusic.stop();
        world.player.engine.stop();
        console.log(world.player.engine.isPlaying);
        resetGame();
        world.level = 1;
        this.scene.start("menu");
    }.bind(this));

    this.gameOverWindow = function (bool) {
        this.window.setVisible(bool);
        this.gameOver.setVisible(bool);
        this.retryBtn.setVisible(bool);
        this.quitBtn.setVisible(bool);
    };
    this.retryBtn.on('pointerdown', function(pointer) {
        resetGame();
        this.gameMusic.stop();
        this.scene.restart();
        this.gameOverWindow(false);
    }.bind(this));

    this.continueBtn.on('pointerdown', function(pointer) {
        world.level += 1;
        resetGame();
        this.gameMusic.stop();
        this.scene.restart();
        this.gameWinWindow(false);
    }.bind(this));

    this.gameWinWindow = function(bool) {
        this.window.setVisible(bool);
        this.gameWin.setVisible(bool);
        this.continueBtn.setVisible(bool);
        this.quitBtn.setVisible(bool);
    }


    this.physics.world.bounds.height = 400;
    this.physics.world.bounds.width = 800;
    this.space = this.add.tileSprite(400,300, 800, 600, "space");
    
    this.stars = this.add.tileSprite(400,300, 800, 600, "stars");

    this.clouds = this.add.tileSprite(400, 300, 800, 600, "clouds");

    const hpHolder = this.add.rectangle(16,300, 20,400, 0x252525);
    hpHolder.setDepth(1);
    this.hp = this.add.rectangle(16,300, 20, 400, 0x80F68A);
    this.hp.setDepth(1);

    const spHolder = this.add.rectangle(784, 300, 20, 400, 0x252525);
    spHolder.setDepth(1);
    this.sp = this.add.rectangle(784, 300, 20, 400, 0xFFB545);
    this.sp.setDepth(1);

    world.letters = this.physics.add.group({immovable: true, allowGravity: false});

    world.lvlTxt = this.add.text(190, 8, world.level.toString(), {font: "35px Arial"});

    world.lvlTxt.setDepth(3);

    world.livesTxt = this.add.text(591, 8, "2", {font: "35px Arial"});

    world.livesTxt.setDepth(3);
    
    world.timerTxt = this.add.text(336, 17, "00:00", {font: "50px Arial "});
    world.timerTxt.setDepth(3);
    
    const player = this.add.player(400,400);

    world.player = this.add.existing(player, {immovable: false});

    world.enemies = this.add.group();
    
    let eBullets = this.add.group({immovable: false, allowGravity: false});

    let pBullets = this.add.group({immovable: false, allowGravity: false});

    world.pBullets = pBullets;
    
    world.eBullets = eBullets;

    this.uiHud = this.add.image(400,300, "uiHud");
    this.uiHud.setDepth(2);

    this.physics.add.collider(world.enemies, world.enemies);

    console.log("hit player: " + player.isHit);

    /*
    this.physics.add.collider(world.enemies, world.player,(enemy, player) => {
        if(!player.isHit){
            bouncePlayer(enemy, player);
            player.isHit = true;
        }
    });
    */

    function bouncePlayer(bullet, player) {
        if(!player.shield.visible){
            if(world.health <30) {
                player.die.play();
                world.lives -= 1;
                
            }
            else {
                player.hit.play();
            }
            world.health -= 30;
        }
        else {
            player.block.play();
        }
    }

    this.physics.add.overlap(world.eBullets, player, hitPlayer);

    function hitPlayer(bullet, player) {
        if(!player.shield.visible){
            if(world.health <30) {
                player.die.play();
                world.lives -= 1;
                player.engine.stop();
                
            }
            else {
                player.hit.play();
            }
            world.health -= 30;
        }
        else {
            player.block.play();
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
            world.enemies.children.entries[i].particles.setVisible(true);
            world.enemies.children.entries[i].letter.setVisible(true);  
            world.letters.children.entries[i].setVisible(false);
            world.letters.children.entries[i].value.setVisible(false);
            world.enemies.children.entries[i].block.play();
        }
        world.lettHead = 0;
        console.log(world.enemies);
    }

    world.enemAlive = true;

    function hitEnemy(bullet, enemy) {
        if(enemy.visible) {
            var nextLett = world.lettHead;

            if(enemy.char === world.word.goal[nextLett]) {
                enemy.hit.play();
                world.letters.children.entries[nextLett].setVisible(true);
                world.letters.children.entries[nextLett].value.setVisible(true);
                enemy.setVisible(false);
                enemy.particles.setVisible(false);
                enemy.letter.setVisible(false);
                enemy.engine.stop();
                world.lettHead++;
            }
            if(enemy.char !== world.word.goal[nextLett]) {
                world.player.hit.play();
                world.health -= 30;
                if(world.health <= 0) {
                    world.lives -= 1;
                }
                resetEnemies();  
            }
            bullet.destroy();
            bullet.particles.destroy(); 
        } 
    }
    this.anims.create({
        key: 'enemyIdle',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, ende: 3}),
        frameRate: 10,
        repeat: -1
    })

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
}