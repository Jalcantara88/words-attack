const { shield } = require('../objects/world');
const world = require('../objects/world');

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ship");  

        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        
        this.isShooting = false;

        this.body.setCircle(50);
        this.body.setFriction(0,0);

        this.alive = true;
        this.engine = this.scene.sound.add('playerEngine', { volume: 0.3, loop: true });
        this.engine.play();
        //this.thrust = this.scene.sound.add('playerThrust',{volume: 0.3, loop: false});
        //this.thrust.play();
        this.laser = this.scene.sound.add('playerShoot',{volume: 0.2, loop: false});
        this.block = this.scene.sound.add('playerBlock',{volume: 0.4, loop: false});
        this.hit = this.scene.sound.add('playerHit',{volume: 0.3, loop: false});
        this.die = this.scene.sound.add('playerDie',{volume: 0.4, loop: false});

        this.shield =  this.scene.add.sprite(x, y, "shield");
        this.shield.setDepth(1);
        this.shield.blendMode = 'ADD';
        this.shield.visible = false;
        this.shieldDrain = false;

        this.particles = this.scene.add.particles('bulletPart');
        this.setDepth(1)
        this.particles.setDepth(2);
        

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

        if(world.shield <= 0) {
            this.shield.visible = false;
        }

        if(world.health <= 0) {
            this.setVisible(false);
            this.particles.setVisible(false);
            this.alive = false; 
            this.engine.stop();        
        }
        if(world.lives <= 0) {
            this.engine.stop();
        }
        

        if(world.lives > 0) {
            if(!this.alive) {
                this.alive = true;
            }
            
            this.setVisible(true);
            this.particles.setVisible(true);
        }
        
    }

    idle() {
        this.anims.play('idle', true);
    }

    up() {
        if(this.y > 350) {
            this.y -= world.moveSpeed;
            this.body.y -= world.moveSpeed;
            this.anims.play('up', true);
        }   
    }

    down() {
        if(this.y < 520) {
            this.y += world.moveSpeed;
            this.body.y += world.moveSpeed;
            this.anims.play('down', true);
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
            this.anims.play('right', true);
            this.x += world.moveSpeed;
            this.body.x += world.moveSpeed;
        }
    }

    shoot(target) {
        if(this.alive) {
            this.laser.play();
            const bullet = this.scene.add.bullet(this, target, "0x0000ff");
            world.pBullets.add(bullet);
        }    
    }
};

Phaser.GameObjects.GameObjectFactory.register("player", function(x, y) {
    const player = new Player(this.scene, x, y);

    this.displayList.add(player);
    this.updateList.add(player);

    return player;
});