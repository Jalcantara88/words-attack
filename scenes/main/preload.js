import dude from '../../assets/dude.png';
import sky from '../../assets/bg.png';

module.exports = function preload ()
{
    this.load.spritesheet("dude", dude, {frameWidth: 32, frameHeight: 48});

    this.load.image('sky', sky);
   
}