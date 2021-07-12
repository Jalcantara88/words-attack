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
import gameMusic from '../../assets/gameMusic.mp3';
import playerEngine from '../../assets/playerEngine.mp3';
import playerBlock from '../../assets/playerBlock.mp3';
import playerHit from '../../assets/playerHit.mp3';
import playerDie from '../../assets/playerDead.mp3';
import playerShoot from '../../assets/playerShoot.mp3';
import playerThrust from '../../assets/playerThrust.mp3';
import enemyShoot from '../../assets/enemyShoot.mp3';
import enemyBlock from '../../assets/enemyBlock.mp3';
import enemyEngine from '../../assets/enemyEngine.mp3';
import window from '../../assets/window.png';
import retryBtn from '../../assets/retryBtn.png';
import quitBtn from '../../assets/quitBtn.png';
import continueBtn from '../../assets/continueBtn.png';
import gameOver from '../../assets/gameOver.png';
import gameWin from '../../assets/gameWin.png';
import enemyHit from '../../assets/enemyHit.mp3';

module.exports = function preload ()
{
    this.load.spritesheet("ship", ship, {frameWidth: 100, frameHeight: 100});

    this.load.spritesheet("enemy", enemy, {frameWidth: 100, frameHeight: 100});
    
    this.load.image("uiHud", uiHud);

    this.load.image("window", window);
    this.load.image("retryBtn", retryBtn);
    this.load.image("quitBtn", quitBtn);
    this.load.image("continueBtn",continueBtn);
    this.load.image("gameOver", gameOver);
    this.load.image("gameWin", gameWin);

    this.load.image("space", space);

    this.load.image("clouds", clouds);

    this.load.image('stars', stars);

    this.load.image('bullet', bullet);
   
    this.load.image('bulletPart', bulletPart);

    this.load.spritesheet('otherDude', od, {frameWidth: 32, frameHeight: 48});

    this.load.audio("gameMusic", gameMusic);

    this.load.audio("playerEngine", playerEngine);
    this.load.audio("playerThrust", playerThrust);
    this.load.audio("playerBlock", playerBlock);
    this.load.audio("playerDie", playerDie);
    this.load.audio("playerHit", playerHit);
    this.load.audio("playerShoot", playerShoot);

    this.load.audio("enemyEngine", enemyEngine);
    this.load.audio("enemyShoot", enemyShoot);

    this.load.audio("enemyBlock", enemyBlock);

    this.load.audio("enemyHit", enemyHit);

    this.load.image('shield', shield);
}