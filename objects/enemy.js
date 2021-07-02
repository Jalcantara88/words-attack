const world = require('../objects/world');

class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, letter) {
        super(scene, x, y, 'enemy',letter);
        console.log(letter);  

        scene.physics.add.existing(this,{allowGravity: false});
        
        this.isShooting = false;

        this.letter = this.scene.add.text(x, y, letter, {font: "35px Arial"});
        this.letter.setOrigin(0.5);
        this.letter.setDepth(1);
        //this.scene.children.bringToTop(this.letter);

        //var letter = this.scene.add.text(x, y, letter, {font: "35px Arial"});
//////////
        var particles = this.scene.add.particles('bulletPart');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0},
            blendMode: 'ADD',
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

Phaser.GameObjects.GameObjectFactory.register("enemy", function(x, y, letter) {
    const enemy = new Enemy(this.scene, x, y, letter);
    this.displayList.add(enemy);
    this.updateList.add(enemy);

    return enemy;
});