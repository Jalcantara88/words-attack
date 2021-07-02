import dude from '../../assets/dude.png';
import sky from '../../assets/bg.png';
import bullet from '../../assets/bullet.png';
import bulletPart from '../../assets/bulletParticle.png';
import od from '../../assets/otherDude.png';
import enemy from '../../assets/enemy.png';

module.exports = function preload ()
{
    this.load.spritesheet("dude", dude, {frameWidth: 32, frameHeight: 48});

    this.load.image('sky', sky);

    this.load.image('bullet', bullet);
   
    this.load.image('bulletPart', bulletPart);

    this.load.spritesheet('otherDude', od, {frameWidth: 32, frameHeight: 48});

    this.load.image('enemy', enemy);
}