const world = require("../../objects/world");

import wall from '../../assets/menuBG.png';
import window from '../../assets/window.png';
import gameTitle from '../../assets/gameTitle.png';
import credits from '../../assets/credits.png';
import info from '../../assets/info.png';
import infoBtn from '../../assets/infoBtn.png';
import startBtn from '../../assets/startBtn.png';
import creditsBtn from '../../assets/creditsBtn.png';
import backBtn from '../../assets/backBtn.png';
import menuMusic from '../../assets/menuMusic.mp3';
import space from '../../assets/space.png';
import clouds from '../../assets/clouds.png';
import stars from '../../assets/stars.png';
import button from '../../assets/button.mp3';
import back from '../../assets/back.mp3';

import controls from '../../assets/controls.png';
import okBtn from '../../assets/okBtn.png';

function menuPre ()
{
    this.load.image("space", space);
    this.load.image("clouds", clouds);
    this.load.image("stars", stars);
    this.load.image("wall", wall);
    this.load.image("window", window);
    this.load.image("gameTitle", gameTitle);
    this.load.image("credits", credits);
    this.load.image("info", info);
    this.load.image("infoBtn", infoBtn);
    this.load.image("startBtn", startBtn);
    this.load.image("creditsBtn", creditsBtn);
    this.load.image("backBtn", backBtn);
    this.load.audio("menuMusic", menuMusic);
    this.load.audio("button", button);
    this.load.audio("back", back);

    this.load.image("controls", controls);
    this.load.image("okBtn", okBtn);
}

function menuCre ()
{
    this.space = this.add.tileSprite(400,300,800,600,"space");
    this.clouds = this.add.tileSprite(400,300,800,600,"clouds");
    this.stars = this.add.tileSprite(400,300,800,600, "stars");
    this.menuBG = this.add.image(400,300, "wall");
    this.window = this.add.image(400,260, "window");
    this.window.setAlpha(0.5);
    this.window.setVisible(false);
    this.gameTitle = this.add.image(400,250, "gameTitle");
    this.info = this.add.image(400, 260, "info");
    this.info.setVisible(false);
    this.credits = this.add.image(400,260,"credits");
    this.credits.setVisible(false);
    this.creditsBtn = this.add.image(620, 550, "creditsBtn").setInteractive();
    this.startBtn = this.add.image(400, 550, "startBtn").setInteractive();
    this.infoBtn = this.add.image(170,550,"infoBtn").setInteractive();
    this.backBtn = this.add.image(400,550,"backBtn").setInteractive();
    this.backBtn.setVisible(false);
    this.menuMusic = this.sound.add('menuMusic', { volume: 0.2, loop: true });
    this.menuMusic.play();
    this.button = this.sound.add('button', {volume: 0.5, loop: false});
    this.back = this.sound.add('back', {volume: 0.5, loop: false});

    this.controls = this.add.image(400,250, "controls");
    this.controls.setDepth(3);
    this.controls.setVisible(false);
    this.okBtn = this.add.image(400, 450, "okBtn").setInteractive();
    this.okBtn.setDepth(3);
    this.okBtn.setVisible(false);

    this.okBtn.on('pointerdown', function(pointer) {
        this.window.setVisible(false);
        this.controls.setVisible(false);
        this.okBtn.setVisible(false);
        this.button.play();
        this.menuMusic.stop();
        world.showControls = false;
        this.scene.run("main");
    }.bind(this));

    this.infoBtn.on('pointerdown', function(pointer) {
        this.button.play();
        this.gameTitle.setVisible(false);
        this.credits.setVisible(false);
        this.infoBtn.setVisible(false);
        this.startBtn.setVisible(false);
        this.creditsBtn.setVisible(false);
        this.window.setVisible(true);
        this.info.setVisible(true);
        this.backBtn.setVisible(true);
    }.bind(this));

    this.backBtn.on('pointerdown', function(pointer) {
        this.back.play();
        this.controls.setVisible(false);
        this.okBtn.setVisible(false);
        this.backBtn.setVisible(false);
        this.credits.setVisible(false);
        this.info.setVisible(false);
        this.window.setVisible(false);
        this.gameTitle.setVisible(true);
        this.infoBtn.setVisible(true);
        this.startBtn.setVisible(true);
        this.creditsBtn.setVisible(true);
    }.bind(this));
    
    this.startBtn.on('pointerdown', function(pointer) {
        if(world.showControls) {
            this.infoBtn.setVisible(false);
            this.creditsBtn.setVisible(false);
            this.backBtn.setVisible(true);

            this.window.setVisible(true);
            this.gameTitle.setVisible(false);
            this.controls.setVisible(true);
            this.okBtn.setVisible(true);
        }
        else {
            this.button.play();
            this.menuMusic.stop();
            this.scene.run("main");
        } 
    }.bind(this));

    this.creditsBtn.on('pointerdown', function(pointer) {
        this.button.play();
        this.backBtn.setVisible(true);
        this.credits.setVisible(true);
        this.info.setVisible(false);
        this.window.setVisible(true);
        this.gameTitle.setVisible(false);
        this.infoBtn.setVisible(false);
        this.startBtn.setVisible(false);
        this.creditsBtn.setVisible(false);
    }.bind(this));
}

function menuUp() {
    this.space.tilePositionX += 0.5;
    this.clouds.tilePositionX += 0.3;
    this.clouds.tilePositionX += 0.1;

    if(!this.menuMusic.isPlaying) {
        //this.menuMusic.play();
    }
 
}
var menuScene = new Phaser.Scene("menu");

menuScene.preload = menuPre;
menuScene.create = menuCre;
menuScene.update = menuUp;

export default menuScene;