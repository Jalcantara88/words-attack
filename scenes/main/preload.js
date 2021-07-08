import dude from '../../assets/dude.png';
import space from '../../assets/space.png';
import bullet from '../../assets/bullet.png';
import bulletPart from '../../assets/bulletParticle.png';
import od from '../../assets/otherDude.png';
import enemy from '../../assets/enemy.png';
import shield from '../../assets/shield.png';
import ship from '../../assets/ship.png';
import uiHud from '../../assets/uiOverlay.png';
import clouds from '../../assets/clouds.png';
import stars from '../../assets/stars.png';

module.exports = function preload ()
{

    //this.load.spritesheet("dude", dude, {frameWidth: 32, frameHeight: 48});

    this.load.spritesheet("ship", ship, {frameWidth: 100, frameHeight: 100});

    this.load.image("uiHud", uiHud);

    this.load.image("space", space);

    this.load.image("clouds", clouds);

    this.load.image('stars', stars);

    this.load.image('bullet', bullet);
   
    this.load.image('bulletPart', bulletPart);

    this.load.spritesheet('otherDude', od, {frameWidth: 32, frameHeight: 48});

    this.load.image('enemy', enemy);

    this.load.image('shield', shield);
}