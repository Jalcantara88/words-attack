const Lifespan = 2500;
const speed = 1000;

class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, player, pointer) {
        super(scene, player.x, player.y, 'bullet');

        this.pointer = pointer;
        this.initialized = false;

        setTimeout(() => {
            this.destroy();
            
        }, Lifespan);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;

        var particles = this.scene.add.particles('bulletPart');

        var emitter = particles.createEmitter({
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