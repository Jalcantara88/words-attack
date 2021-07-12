import create from './create';
import preload from './preload';
import update from './update';
var mainScene = new Phaser.Scene("main");

mainScene.preload = preload;
mainScene.create = create;
mainScene.update = update;

export default mainScene;