import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import FallingObjects from "./fallingObjects.js";
import Puh from './puh.js';
import Claw from "./Claw.js";

const DEBUG = false;
const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const CAMERASPEED = 100; // Velocidad a la que sube en funcion del tiempo
var cameraMoves = true;
const TOP = 1100; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class Scene1 extends Phaser.Scene{
    constructor(){
        
        super({key: 'Scene1'}); //Idemtificador para llamar a este escena desde otras.
    }

    /*init(){
    this.score = 0;
    }*/

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
        this.load.spritesheet('skullAn', 'assets/obstacles/HeadAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('clawAn', 'assets/obstacles/ClawAnimation.png', {frameWidth:32,  frameHeight: 32});
        this.load.spritesheet('boneAn', 'assets/obstacles/BoneAnimation.png', {frameWidth:32,  frameHeight: 32});
    }

    create(){
        startTime = this.time.now;
        cameraMoves = true;
        this.lastTimeObbs = 0;
        this.song = this.sound.add('song');
        this.song.play();

        this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        this.fondoLayer = this.map.createFromObjects('fondo', {name: "fondoimg", key: 'fondoimg'});
        const myTileset = this.map.addTilesetImage('mundo', 'patronesTilemap');
        this.platformLayer = this.map.createLayer('plataformas', myTileset);
        this.platformLayer.setCollision(1);
        this.decoracionLayer = this.map.createLayer('decoracion', myTileset);

        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa

        this.puh = new Puh(this, 100, 1150);// instanciación de Puh
        this.puh.setFly(false) // Llamada a método para cambiar el booleano de la clase puh que determina si vuela o no.

        //this.initScore();
    
        //Creación de todos los objetos del mapa, se les quita la gravedad y se les hace inamovibles.

        /*let velocity = 100 * Phaser.Math.Between(1.3,2);

        if(Phaser.Math.Between(0,10)>5){
            velocity = 0 - velocity;
        }
        */
        //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);

        this.obstaclesList = ['bone', 'birdSkull'] // Creación del array de la lista de objetos cargados en el preload.
        this.obstacles = this.physics.add.group(); // A este "grupo" se le añade físicas.
        this.claw = 'birdClaw';
        this.clawobs = this.physics.add.group();

        //this.physics.add.collider(this.obstacles, this.floor, this.addScore.bind(this), null);
        this.physics.add.collider(this.puh, this.platformLayer);
        this.physics.add.collider(this.clawobs, this.puh, this.callClaw, null);
        this.physics.add.collider(this.obstacles, this.puh, this.gameOver.bind(this), null);
        this.physics.add.collider(this.puh, this.portal, this.nextLevel.bind(this),null);
    
        //CAMARA
        this.initCamera();

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    
    }

    /*itScore(){
        this.scoreText = this.add.text(16,16, 'Points: 0', {
        fontSize: '40px',
        fill: '#fff',
        fontFamily: 'verdana, arial, sans-serif' 
        });
    }
    
    addScore(){
        this.score++;
        this.scoreText.setText('Points: ' + this.score);
        console.log('1 punto');
    }*/
    
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

    nextLevel(){

        this.song.stop();
        this.scene.start('Scene2');

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

    update(t,dt){
        this.lastTimeObbs += dt;
        if(this.lastTimeObbs > 1000)
        {
            this.generateObs(dt);
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

        /*if(this.puh.y > 1600) {
            this.gameOver();
    
        }*/

        if (camCurrentPosY > TOP){ // Detiene el seguimiento de camara
            cameraMoves = false;
        }
        
        if(DEBUG){
            console.log(this.puh.x)
            console.log((-(this.time.now - startTime)*CAMERASPEED)*dt/10000)
        }
    }
}