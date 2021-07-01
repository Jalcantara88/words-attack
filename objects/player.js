const world = require('../objects/world');

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "dude");  

        scene.physics.add.existing(this,{allowGravity: false});
        
        this.isShooting = false;

        var particles = this.scene.add.particles('bulletPart');

        var emitter = particles.createEmitter({
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
    }

    idle() {

    }

    up() {
        if(this.y > 350) {
            this.y -= world.moveSpeed;
        }   
    }

    down() {
        if(this.y < 520) {
            this.y += world.moveSpeed;
        }
    }

    left() {
        if(this.x > 50) {
            this.anims.play('left', true);
            this.x -= world.moveSpeed;
        }
    }

    right() {
        if(this.x < 750) {
            //(!this.anims.isPlaying || this.anims.key !== 'right') && 
            this.anims.play('right', true);
            this.x += world.moveSpeed;
        }
    }

    shoot(target) {
        const bullet = this.scene.add.bullet(this, target);
    }
};

Phaser.GameObjects.GameObjectFactory.register("player", function(x, y) {
    const player = new Player(this.scene, x, y);

    this.displayList.add(player);
    this.updateList.add(player);

    return player;
});