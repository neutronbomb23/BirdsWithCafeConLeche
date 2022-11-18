import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import Puh from './puh.js';
import Rick from './Rick.js';

const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const TOP = 1100; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class BossScene extends Phaser.Scene{
    constructor(){
        super({key: 'bossScene'});
    }

    preload(){ // precarga los assets
        this.load.image('background', 'assets/wallpaperProvisional.png');// fondo
        this.load.spritesheet('puhIddle', 'assets/puh/puh.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/puh/caminar.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/puh/Walk.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.spritesheet('RickIddle', 'assets/Rick/pigeon_pecking.png', {frameWidth:48,  frameHeight: 32});// idle de Rick
        this.load.spritesheet('RickWalk', 'assets/Rick/pigeon_walking.png', {frameWidth:32,  frameHeight: 32});// movimiento de Rick
        this.load.image('floor', 'assets/floor.png');// suelo
        this.load.audio('song','assets/audio/game.mp3');// sonido
        this.load.image('platform', 'assets/platform.png');// plataforma
    }

    create(){
        startTime = this.time.now;
        this.song = this.sound.add('song');
        this.song.play();


        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa
        this.add.image(720, 800, 'background').setScale(6); // Imagen fondo

        this.puh = new Puh(this, 600, 1300);// instanciación de Puh
        this.puh.setFly(true) // Llamada a método para cambiar el booleano de la clase puh que determina si vuela o no.
        this.rick = new Rick(this, 900, 200);// instanciación de Rick

        this.floor = this.physics.add.image(720,1550, 'floor').setImmovable(true).setScale(3);
        this.floor.body.allowGravity = false;

        this.physics.add.collider(this.puh, this.floor);// colisión entre Puh y el suelo
        this.physics.add.collider(this.rick, this.floor);// colisión entre Rick y el suelo
        this.physics.add.collider(this.puh, this.rick);// colisión entre Puh y el suelo

       // this.platform = this.physics.add.image(520,950, 'platform').setImmovable(true).setScale(1);
        //this.platform.body.allowGravity = false;
        //this.physics.add.collider(this.puh, this.platform);
        //this.physics.add.collider(this.rick, this.platform);
       // this.platform.setCollideWorldBounds(true);
       // this.platform.body.onWorldBounds=true;
        //this.physics.add.collider(this.platform, this.floor);

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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

    GetPuhReference(){
        return this.puh;
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