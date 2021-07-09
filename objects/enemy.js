const world = require('../objects/world');

class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, letter) {
        super(scene, x, y, 'enemy',letter);
        console.log(letter);  

        scene.physics.add.existing(this);
 
        this.onWorldBounds = true;

        this.body.setCircle(50);

        this.isShooting = false;
        this.char = letter;

        this.tint = Math.random() * 0xffffff;

        this.letter = this.scene.add.text(x, y, letter, {font: "35px Arial"});
        this.letter.setOrigin(0.5);
        this.letter.setDepth(1);
 
        this.particles = this.scene.add.particles('bulletPart');

        var emitter = this.particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0},
            blendMode: 'ADD',
        });
        emitter.startFollow(this); 
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.letter.x = this.x;
        this.letter.y = this.y;
    }

    shoot(target) {
        const bullet = this.scene.add.bullet(this, target, '0xff0000');
        world.eBullets.add(bullet);
    }
};

Phaser.GameObjects.GameObjectFactory.register("enemy", function(x, y, letter) {
    const enemy = new Enemy(this.scene, x, y, letter);
    this.displayList.add(enemy);
    this.updateList.add(enemy);

    return enemy;
});