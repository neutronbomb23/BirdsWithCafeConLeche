import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import Puh from './puh.js';
import Rick from "./Rick.js";
const DEBUG = true;

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
        this.load.spritesheet('RickIddle', 'assets/pigeon_pecking/Rick.png', {frameWidth:48,  frameHeight: 32});// idle de Rick
        this.load.spritesheet('RickWalk', 'assets/pigeon_walking/Rick.png', {frameWidth:31,  frameHeight: 32});// movimiento de Rick
        this.load.image('floor', 'assets/floor.png');// suelo
        this.load.audio('song','assets/audio/game.mp3');// sonido
    }

    create(){
        startTime = this.time.now;
        this.lastTimeObbs = 0;
        this.song = this.sound.add('song');
        this.song.play();


        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa
        this.add.image(720, 800, 'background').setScale(6); // Imagen fondo

        this.puh = new Puh(this, 600, 200);// instanciación de Puh
        this.rick = new Rick(this, 900, 200);// instanciación de Rick

        this.floor = this.physics.add.image(720,1250, 'floor').setImmovable(true).setScale(3);// instanciación del suelo
        this.floor.body.allowGravity = false;

        this.physics.add.collider(this.puh, this.floor);// colisión etre Puh y el suelo
        this.physics.add.collider(this.rick, this.floor);// colisión entre Rick y el suelo

       // this.platform.setCollideWorldBounds(true);
       // this.platform.body.onWorldBounds=true;

    }


    gameOver(){
        this.puh.visible = false;
        this.rick.visible = false;
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