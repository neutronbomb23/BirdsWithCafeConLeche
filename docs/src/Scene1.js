import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import FallingObjects from "./fallingObjects.js";
import Puh from './puh.js';
import Claw from "./Claw.js";

const DEBUG = false;
const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const CAMERASPEED = 100; // Velocidad a la que sube en funcion del tiempo
var cameraPos = -15000;
var puhPos = 16800;
const TOP = -100000; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class Scene1 extends Phaser.Scene{
    constructor(){
        super({key: 'Scene1'}); //Idemtificador para llamar a este escena desde otras.
    }

    init(data){
        console.log(data)
        this.cameraPos = (-data + 1500)
        this.puhPos = (data)
    }

    preload(){ // precarga los assets
        this.load.tilemapTiledJSON('tilemap', 'assets/Tilemap/gamemap.json'); //tilemap JSON
        this.load.image('patronesTilemap', 'assets/Tilemap/goodly-2x.png'); // tile img
        this.load.image('fondoimg', 'assets/Tilemap/metall001-new-tileable.png'); // fondo
        this.load.image('background', 'assets/wallpaperProvisional.png');// fondo provisional
        this.load.spritesheet('puhIddle', 'assets/puh/puh.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/puh/caminar.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/puh/Walk.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.image('bone', 'assets/obstacles/bone.png');// hueso
        this.load.image('birdSkull', 'assets/obstacles/birdSkull.png');// calavera de pájaro
        this.load.image('birdClaw', 'assets/obstacles/birdClaw.png');// garra de pájaro
        this.load.audio('song','assets/audio/game.mp3');// sonido
        this.load.image('portal', 'assets/portal.png');
        this.load.audio('crow', 'assets/audio/crow.mp3');
        this.load.audio('death', 'assets/audio/death.mp3');
        this.load.spritesheet('skullAn', 'assets/obstacles/HeadAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('clawAn', 'assets/obstacles/ClawAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('boneAn', 'assets/obstacles/BoneAnimation.png', {frameWidth:32,  frameHeight: 32});
    }

    create(){
        startTime = this.time.now;
        this.lastTimeObbs = 0;
        this.deathSound = this.sound.add('death');
        this.song = this.sound.add('song');
        this.song.play();
        this.fx = this.sound.add('crow');
        
        
        this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        this.fondoLayer = this.map.createFromObjects('fondo', {name: "fondoimg", key: 'fondoimg'});
        const myTileset = this.map.addTilesetImage('mundo', 'patronesTilemap');
        this.platformLayer = this.map.createLayer('plataformas', myTileset);
        this.platformLayer.setCollisionByExclusion(-1, true);
        this.decoracionLayer = this.map.createLayer('decoracion', myTileset);
        this.pinchos = this.map.createLayer('pinchos', myTileset);
        this.pinchos.setCollisionByExclusion(-1, true);

        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa

        this.puh = new Puh(this, 100, this.puhPos);// instanciación de Puh
        this.puh.body.setSize(this.puh.width - 10, this.puh.height, true);
        this.puh.setFly(false) // Llamada a método para cambiar el booleano de la clase puh que determina si vuela o no.
        this.chirpFX = this.puh.chirp = false;
        
        this.obstaclesList = ['bone', 'birdSkull'] // Creación del array de la lista de objetos cargados en el preload.
        this.obstacles = this.physics.add.group(); // A este "grupo" se le añade físicas.
        this.claw = 'birdClaw';// variable con identificador de la garra
        this.clawobs = this.physics.add.group();// grupo de objetos(garras) con físicas

        //this.physics.add.collider(this.obstacles, this.floor, this.addScore.bind(this), null);
        this.physics.add.collider(this.puh, this.platformLayer);
       
        this.physics.add.collider(this.clawobs, this.puh, this.callClaw, null);
       
    
        this.physics.add.collider(this.obstacles, this.platformLayer);
        this.physics.add.collider(this.puh, this.platformLayer);

        this.physics.add.collider(this.obstacles, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.puh, this.portal, this.nextLevel.bind(this),null);
        this.physics.add.collider(this.puh, this.pinchos, this.gameOver.bind(this), null);
    
        this.initCamera(); // Camara

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);   
    }

    callClaw(obj1, obj2){
        obj1.slowVel();
        obj2.destroy();
    }


    initCamera(){
        this.cameras.main.startFollow(this.puh); // Sigue a puh 
        this.cameras.main.setFollowOffset(0, this.cameraPos); // Distancia entre el la camara y puh
        this.cameras.main.setLerp(0, 0.1);
        this.cameras.main.scrollX = false;
    }

    updateCamera(){
        var runTimeSecs = (this.time.now - startTime) * 0.001; // Tiempo desde que se inicio la escena
        if(DEBUG)console.log(runTimeSecs)
        camCurrentPosY = this.cameraPos + runTimeSecs*CAMERASPEED - (PUHY - this.puh.y); // Distancia entre el la camara y puh
        this.cameras.main.setFollowOffset(0, camCurrentPosY); // Set de la posición y de la camara
    }

    gameOver(){
        this.puh.destroy(); 
        this.song.stop();
        
        this.scene.start('GameOver', this.puh.y);
        this.deathSound.play();
        this.deathSound.on('complete', audio => {  //Una vez que el audio se haya acabado de reproducir, salta a la escena de GameOver
            console.log("He muerto");
        });
    }   

    nextLevel(){
        this.song.stop();
        this.scene.start('Scene2');
    }

    randomNumbSound(){
        this.soundRandom = Math.floor(Math.random() * 100); //Generador de números aleatorios para controlar el sonido de Puh y de Rick
        return this.soundRandom;
        console.log(this.soundRandom)
    }

    generateObs(dt){
        let randomNumb = Math.floor(Math.random() * 3);// redondea hacia abajo (número entero)
        if (randomNumb <= 2){
            var idObs = this.obstaclesList[randomNumb];// idObs será uno de los obstáculos (aleatorio)
        }
        let y =(-1500 + this.puh.y);//Posición desde la que se generan los obstáculos (es relativa a la posición de Puh)
        if (idObs == 'bone' || idObs == 'birdSkull'){
            let toni =  new FallingObjects(this, y, idObs);// crea un falling object del tipo idObs
            this.obstacles.add(toni);// añade el obstáculo aleatorio al grupo
        }
        else{// la garra tiene una funcionalidad distinta
            let toni = new Claw(this, y, 'birdClaw');
            this.clawobs.add(toni);// añade la garra al grupo
        }   
    }

    cameraManager(){
        if(camCurrentPosY > TOP) { this.updateCamera(); } // Actualiza su posición respecto a puh
        else { this.cameras.main.stopFollow(); } // Se queda quieta en el eje Y
        
        if(camCurrentPosY > 900) { // DeathZone
            this.gameOver();
        }
    }

    stopMusic(){
        this.song.stop();
    }

    update(t,dt){
        this.randomNumbSound();
        this.lastTimeObbs += dt;
        if(this.lastTimeObbs > 3000){
            this.generateObs(dt);
            this.lastTimeObbs = 0;
        }

        this.cameraManager()

        if(this.keyQ.isDown){
            this.scene.restart();
            this.song.stop();
        }

        if(this.ESC.isDown){
            this.scene.launch('GamePause', {me: this.scene}); //Paso un dato a la escena de Pausa para poder mantenerla pausada sin tener que hacer un scene.start
            this.scene.pause();
        }

        if((this.puh.chirp && this.soundRandom == 2) && !this.fx.isPlaying){ //Si el booleano es true, y el número aleatorio es dos, además debe cumplirse que el sonido no esté sonando.
            console.log(this.puh.chirp);
            this.fx.play();
        }
    }
}