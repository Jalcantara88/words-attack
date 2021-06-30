const { Phaser } = require("../../../../../Downloads/phaser");
const mainCre = require("./create");
const mainPre = require("./preload");
const mainUp = require("./update");

var mainScene = new Phaser.Scene("main");

mainScene.preload = mainPre;
mainScene.create = mainCre;
mainScene.update = mainUp;

export default mainScene;