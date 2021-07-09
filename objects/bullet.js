const Lifespan = 2500;
const speed = 1000;

class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, player, pointer, color) {
        super(scene, player.x, player.y, 'bullet', color);

        this.pointer = pointer;
        this.initialized = false;
        this.tint = color;

        setTimeout(() => {
            this.destroy();
            this.particles.destroy();
            
        }, Lifespan);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.particles = this.scene.add.particles('bulletPart');

        emitter = this.particles.createEmitter({
            speed: 50,
            scale: { start: 1, end: 0},
            blendMode: 'ADD'
        });
        emitter.startFollow(this);
    }

    preUpdate() {  
        if(!this.initialized) {
            //console.log("shot fired");
            this.scene.physics.moveToObject(this, this.pointer, speed );
            this.initialized = true;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register("bullet", function (...args) {
    const bullet = new Bullet(this.scene, ...args);
  
    this.displayList.add(bullet);
    this.updateList.add(bullet);
  
    return bullet;
  });