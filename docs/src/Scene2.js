import { GameOver } from "./GameOver.js";
import { Game } from "./game.js";
import { GamePause } from "./inGamePause.js";
import FallingObjects from "./fallingObjects.js";
import Puh from './puh.js';
import Platform from "./normalPlatform.js";
import Claw from "./Claw.js";

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
        this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/gamemap.json'); //tilemap JSON
        this.load.image('patronesTilemap', 'assets/Tilemap/goodly-2x.png'); // tile img
        this.load.image('fondoimg', 'assets/Tilemap/metall001-new-tileable.png'); // fondo
        this.load.spritesheet('puhIddle', 'assets/images/characters/puh/iddle.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/images/characters/puh/walk.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/images/characters/puh/fly.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.image('bone', 'assets/images/obstacles/bone.png');// hueso
        this.load.image('birdSkull', 'assets/images/obstacles/birdSkull.png');// calavera de pájaro
        this.load.image('birdClaw', 'assets/images/obstacles/birdClaw.png');// garra de pájaro
        this.load.audio('song','assets/audio/game.mp3');// sonido
        this.load.audio('crow', 'assets/audio/crow.mp3');
        this.load.audio('death', 'assets/audio/death.mp3');
        this.load.spritesheet('skullAn', 'assets/images/obstacles/skullAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('clawAn', 'assets/images/obstacles/clawAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('boneAn', 'assets/images/obstacles/boneAnimation.png', {frameWidth:32,  frameHeight: 32});
    }

    create(){
        startTime = this.time.now;
        cameraMoves = true;
        this.lastTimeObbs = 0;
        this.song = this.sound.add('song');
        this.song.play();

        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa
        this.add.image(720, 800, 'background').setScale(6); // Imagen fondo
        
        this.platform = new Platform(this,600,1700);

        this.puh = new Puh(this, 600, 1500);// instanciación de Puh
        this.puh.setFly(false)
    
       
    

        this.floor1 = this.physics.add.image(300,1400, 'floor').setImmovable(true).setScale(1);
        this.floor1.body.allowGravity = false;

        this.floor = this.physics.add.image(720,1100, 'floor').setImmovable(true).setScale(1);
        this.floor.body.allowGravity = false;

        this.zarzas = this.physics.add.image(200, 860, 'zarzas').setImmovable(true).setScale(1);
        this.zarzas.body.allowGravity = false;

        this.floor2 = this.physics.add.image(500,400, 'floor').setImmovable(true).setScale(1);
        this.floor2.body.allowGravity = false;

        this.zarzas1 = this.physics.add.image(800, 150, 'zarzas').setImmovable(true).setScale(1);
        this.zarzas1.body.allowGravity = false;

        this.physics.add.collider(this.puh, this.platform);
        this.physics.add.collider(this.puh, this.platform1);
        this.physics.add.collider(this.puh, this.floor);
        this.physics.add.collider(this.puh, this.floor1);

        //this.platform.setCollideWorldBounds(true);
        //this.platform.body.onWorldBounds=true;
        //this.physics.add.collider(this.platform, this.floor);
        //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);

        this.obstaclesList = ['bone', 'birdSkull'] // Creación del array de la lista de objetos cargados en el preload.
        this.obstacles = this.physics.add.group(); // A este "grupo" se le añade físicas.
        this.claw = 'birdClaw';
        this.clawobs = this.physics.add.group();

        this.physics.add.collider(this.clawobs, this.puh, this.callClaw, null);
        this.physics.add.collider(this.obstacles, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.zarzas, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.zarzas1, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.obstacles, this.platform1);
        this.physics.add.collider(this.obstacles, this.floor);
        this.physics.add.collider(this.obstacles, this.floor1);
        this.physics.add.collider(this.obstacles, this.floor2);

        this.physics.add.collider(this.puh, this.platform1);
        this.physics.add.collider(this.puh, this.floor);
        this.physics.add.collider(this.puh, this.floor1);
        this.physics.add.collider(this.puh, this.floor2);
    
    
        //CAMARA
        this.initCamera();

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors = this.input.keyboard.createCursorKeys();    
    }


    callClaw(obj1, obj2){
        obj1.slowVel();
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
        let randomNumb = Math.floor(Math.random() * 3);
        if (randomNumb <= 2){
            var idObs = this.obstaclesList[randomNumb];
        }
        let y =(300 -(this.time.now - startTime) * CAMERASPEED*dt/10000)
        if (idObs == 'bone' || idObs == 'birdSkull'){
            let toni =  new FallingObjects(this, y, idObs);
            this.obstacles.add(toni);
        }
        else{
            let toni = new Claw(this, y, 'birdClaw');
            this.clawobs.add(toni);
        }
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

        if(this.puh.y > 2000) {
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