
import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import Puh from './puh.js';
const DEBUG = true;

const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const CAMERASPEED = 100; // Velocidad a la que sube en funcion del tiempo
var cameraMoves = true;
const TOP = 1100; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class BossScene extends Phaser.Scene{
    constructor(){
        super({key: 'bossScene',});
    }

    preload(){ // precarga los assets
        this.load.image('background', 'assets/wallpaperProvisional.png');// fondo
        this.load.spritesheet('puhIddle', 'assets/puh/puh.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/puh/caminar.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/puh/Walk.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.image('floor', 'assets/floor.png');// suelo
        this.load.audio('song','assets/audio/game.mp3');// sonido
    }

    create(){
        startTime = this.time.now;
        cameraMoves = true;
        this.lastTimeObbs = 0;
        this.song = this.sound.add('song');
        this.song.play();


        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa
        this.add.image(720, 800, 'background').setScale(6); // Imagen fondo

        this.puh = new Puh(this, 600, 200);// instanciación de Puh
    
        /*this.platform = this.physics.add.image(700,1650, 'platform').setImmovable(true).setScale(1);
        this.platform.body.allowGravity = false;

        this.floor1 = this.physics.add.image(300,1400, 'floor').setImmovable(true).setScale(1);
        this.floor1.body.allowGravity = false;*/

        this.floor = this.physics.add.image(720,1550, 'floor').setImmovable(true).setScale(3);
        this.floor.body.allowGravity = false;

        /*this.platform1 = this.physics.add.image(1000,860, 'platform').setImmovable(true).setScale(1);
        this.platform1.body.allowGravity = false;

        this.zarzas = this.physics.add.image(200, 860, 'zarzas').setImmovable(true).setScale(1);
        this.zarzas.body.allowGravity = false;

        this.floor2 = this.physics.add.image(500,400, 'floor').setImmovable(true).setScale(1);
        this.floor2.body.allowGravity = false;

        this.zarzas1 = this.physics.add.image(800, 150, 'zarzas').setImmovable(true).setScale(1);
        this.zarzas1.body.allowGravity = false;*/

        //this.physics.add.collider(this.puh, this.platform);
        //this.physics.add.collider(this.puh, this.platform1);
        this.physics.add.collider(this.puh, this.floor);
        //this.physics.add.collider(this.puh, this.floor1);

        this.platform.setCollideWorldBounds(true);
        this.platform.body.onWorldBounds=true;
        //this.physics.add.collider(this.platform, this.floor);
        //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);

        this.physics.add.collider(this.puh, this.floor);
    }

    gameOver(){
        this.puh.visible = false;
        console.log('Puh Abatido');
        this.song.stop();
        this.scene.start('GameOver');
    }   

    stopMusic(){
        this.song.stop();
    }

    loadScene = true;
    update(t,dt){
        if(this.loadScene){
            this.scene.restart();
            this.song.stop();
            this.loadScene = false;
        }

        if(this.keyQ.isDown){
            this.scene.restart();
            this.song.stop();
        }

        if(this.ESC.isDown){
            this.scene.launch('GamePause', {me: this.scene});
            this.scene.pause();
        }       
    }
}