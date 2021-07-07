const { shield } = require('../objects/world');
const world = require('../objects/world');

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "dude");  

        scene.physics.add.existing(this,{allowGravity: false});
        
        this.isShooting = false;
        this.xPos = x;
        this.yPos = y;

        this.alive = true;

        this.shield =  this.scene.add.sprite(x, y, "shield");
        this.shield.setDepth(1);
        this.shield.blendMode = 'ADD';
        this.shield.visible = false;
        this.shieldDrain = false;

        this.particles = this.scene.add.particles('bulletPart');

        var emitter = this.particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0},
            blendMode: 'ADD',
            followOffset: {
                x: 1,
                y: 1
            },
            lifespan: 2000,
            gravityY: 2000,
            scale: 1.5,
            moveToY: 0,
            moveToX: 0,
            radial: true,
            angle: {min: 90, max: 100},
            //maxParticles: 100
        });

        emitter.startFollow(this); 
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.shield.x = this.x;
        this.shield.y = this.y;
        //this.shield.body.x = this.body.x;
        //this.shield.body.y = this.body.y;
        //console.log(this.body.y);

        if(world.shield <= 0) {
            this.shield.visible = false;
        }

        if(world.health <= 0) {
            world.lives -=1;
            console.log("you Died");
            this.setVisible(false);
            this.particles.setVisible(false);
            //.setActive(false);
            this.alive = false;
            
            world.lives -= 1;
            
        }
    }

    idle() {

    }

    up() {
        if(this.y > 350) {
            this.y -= world.moveSpeed;
            this.body.y -= world.moveSpeed;
        }   
    }

    down() {
        if(this.y < 520) {
            this.y += world.moveSpeed;
            this.body.y += world.moveSpeed;
        }
    }

    left() {
        if(this.x > 50) {
            this.anims.play('left', true);
            this.x -= world.moveSpeed;
            this.body.x -= world.moveSpeed;
        }
    }

    right() {
        if(this.x < 750) {
            //(!this.anims.isPlaying || this.anims.key !== 'right') && 
            this.anims.play('right', true);
            this.x += world.moveSpeed;
            this.body.x += world.moveSpeed;
        }
    }

    shoot(target) {
        if(this.alive) {
            const bullet = this.scene.add.bullet(this, target, "0x0000ff");
            world.pBullets.add(bullet);
        }
        
        //console.log(world.pBullets.children.entries);
    }
};

Phaser.GameObjects.GameObjectFactory.register("player", function(x, y) {
    const player = new Player(this.scene, x, y);

    this.displayList.add(player);
    this.updateList.add(player);

    return player;
});