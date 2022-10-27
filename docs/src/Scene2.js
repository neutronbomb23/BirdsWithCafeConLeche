import { GameOver } from "./GameOver.js";
import { Game } from "./game.js";
import { GamePause } from "./inGamePause.js";
import FallingObjects from "./fallingObjects.js";
import Puh from './puh.js';
const DEBUG = true;

const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const CAMERASPEED = 100; // Velocidad a la que sube en funcion del tiempo
var cameraMoves = true;
const TOP = 1100; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class Scene2 extends Phaser.Scene{
    constructor(){
        super({key: 'Scene2'});
    }

    preload(){ // precarga los assets
        this.load.image('background', 'assets/wallpaperProvisional.png');// fondo
        this.load.spritesheet('puhIddle', 'assets/puh/puh.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/puh/caminar.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/puh/Walk.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.image('platform', 'assets/platform.png');// plataforma
        this.load.image('floor', 'assets/floor.png');// suelo
        this.load.image('bone', 'assets/obstacles/bone.png');// hueso
        this.load.image('birdSkull', 'assets/obstacles/birdSkull.png');// calavera de pájaro
        this.load.image('birdClaw', 'assets/obstacles/birdClaw.png');// garra de pájaro
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

        this.puh = new Puh(this, 600, 1000);// instanciación de Puh
    
        this.platform = this.physics.add.image(700,1650, 'platform').setImmovable(true).setScale(1);
        this.platform.body.allowGravity = false;

        this.floor = this.physics.add.image(720,800, 'floor').setImmovable(true).setScale(2);
        this.floor.body.allowGravity = false;
    
        this.physics.add.collider(this.puh, this.platform);
        this.physics.add.collider(this.puh, this.floor);

        this.platform.setCollideWorldBounds(true);
        this.platform.body.onWorldBounds=true;
        this.physics.add.collider(this.platform, this.floor);
        //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);

        this.obstaclesList = ['bone', 'birdClaw', 'birdSkull']
        this.obstacles = this.physics.add.group();

        this.physics.add.collider(this.obstacles, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.obstacles, this.platform);
    
        //CAMARA
        this.initCamera();

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors = this.input.keyboard.createCursorKeys();    
    }

    initCamera(){
        this.cameras.main.startFollow(this.puh); // Sigue a puh 
        this.cameras.main.setFollowOffset(0, CAMPOSY); // Distancia entre el la camara y puh
        this.cameras.main.setLerp(0, 0.1);
        this.cameras.main.scrollX = false;
    }

    updateCamera(){
        var runTimeSecs = (this.time.now - startTime) * 0.001; // Tiempo desde que se inicio la escena
        if(DEBUG)console.log(runTimeSecs)
        camCurrentPosY = CAMPOSY + runTimeSecs*CAMERASPEED - (PUHY - this.puh.y); // Distancia entre el la camara y puh
        this.cameras.main.setFollowOffset(0, camCurrentPosY); // Set de la posición y de la camara
    }

    gameOver(){
        this.puh.visible = false;
        console.log('Puh Abatido');
        this.song.stop();
        this.scene.start('GameOver');
    }   

    generateObs(dt){
        let idObs = this.obstaclesList[Math.floor(Math.random() * 3)]
        var toni =  new FallingObjects(this, (-(this.time.now - startTime)*CAMERASPEED*dt/10000), idObs);
        this.obstacles.add(toni);

        //toni.setBounce(2);  
    
        console.log(idObs);
    }

    stopMusic(){
        this.song.stop();
    }

    update(t,dt){
        this.lastTimeObbs += dt;
        if(this.lastTimeObbs > 1000)
        {
            this.generateObs(dt);
            console.log(this.lastTimeObbs);
            this.lastTimeObbs = 0;
        }

        if(cameraMoves){
            this.updateCamera(); // Actualiza su posición respecto a puh
        }
        else{
            this.cameras.main.stopFollow(); // Se queda quieta en el eje Y
        }

        if(this.keyQ.isDown){
            this.scene.restart();
            this.song.stop();
        }

        if(this.ESC.isDown){
            this.scene.launch('GamePause', {me: this.scene});
            this.scene.pause();
        }

        if(this.puh.y > 1600) {
            this.gameOver();
    
        }

        if(this.obstacles.y > 1600){
            this.addScore();
        }            
        
        if (camCurrentPosY > TOP){ // Detiene el seguimiento de camara
            cameraMoves = false;
        }
        
        if(DEBUG){
            console.log(this.puh.y)
            console.log((-(this.time.now - startTime)*CAMERASPEED)*dt/10000)
        }
    }
}