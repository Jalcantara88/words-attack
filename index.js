import menuScene from './scenes/menu';
import mainScene from './scenes/main';
import credScene from './scenes/credits';

require("./objects/player");
require("./objects/bullet");
require("./objects/enemy");

var config = {
   
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        }
    },
};

var game = new Phaser.Game(config);

game.scene.add("menu", menuScene);
game.scene.add("main", mainScene);
game.scene.add("credits", credScene);

game.scene.start("menu");