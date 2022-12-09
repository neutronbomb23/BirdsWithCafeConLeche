import { GameOver } from "./GameOver.js";
import { GamePause } from "./inGamePause.js";
import {Victory } from "./Victory.js";
import Puh from '../Characters/puh.js';
import Rick from '../Characters/Rick.js';
import WaterDrop from '../Obstacles/waterDrop.js';

const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const TOP = 1100; // punto en el eje y en el que se detiene la camara
const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh
var startTime; // Runtime en el momento en el que empieza la escena

export class BossScene extends Phaser.Scene{
    constructor(){
        super({key: 'bossScene'});
    }

    preload(){ // precarga los assets
        this.load.tilemapTiledJSON('bossMap', 'assets/Tilemap/bossScene.json'); //tilemap JSON
        this.load.image('patronesTilemap', 'assets/Tilemap/goodly-2x.png'); // tile img
        this.load.image('fondoimg', 'assets/Tilemap/metall001-new-tileable.png'); // fondo
        this.load.image('background', 'assets/images/background/rust.png');// fondo
        this.load.spritesheet('puhIddle', 'assets/images/characters/puh/iddle.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
        this.load.spritesheet('puhMove', 'assets/images/characters/puh/walk.png', {frameWidth:32,  frameHeight: 32});// Movimiento de Puh
        this.load.spritesheet('puhFly', 'assets/images/characters/puh/fly.png', {frameWidth:32,  frameHeight: 32});// Vuelo de Puh
        this.load.spritesheet('RickIddle', 'assets/images/characters/rick/pigeon_pecking.png', {frameWidth:48,  frameHeight: 32});// idle de Rick
        this.load.spritesheet('RickWalk', 'assets/images/characters/rick/pigeon_walking.png', {frameWidth:32,  frameHeight: 32});// movimiento de Rick
        this.load.spritesheet('RickAttack', 'assets/images/characters/rick/pigeon_red.png', {frameWidth:32,  frameHeight: 32});// ataque de Rick
        this.load.spritesheet('RickSpit', 'assets/images/characters/rick/pigeon_spitting.png', {frameWidth:48,  frameHeight: 32});// ataque de Rick
        this.load.audio('Boss', 'assets/audio/rick.mp3');
        this.load.audio('death', 'assets/audio/death.mp3');
        this.load.audio('song','assets/audio/game.mp3');// sonido
        this.load.audio('water','assets/audio/water.mp3');// sonido
        this.load.audio('golpe', 'assets/audio/golpe.mp3');
        this.load.image('WaterDrop', 'assets/images/characters/rick/gota.png');// gota de agua
        this.load.audio('RickDeath', 'assets/audio/RickDeath.mp3');
        
    }

    create(){
        startTime = this.time.now;
        this.song = this.sound.add('song');
        this.deathSound = this.sound.add('death');
        this.song.setLoop(true);
        this.song.play();
        this.RickDeath = this.sound.add('RickDeath');
        this.golpeSound = this.sound.add('golpe');
        this.waterSound = this.sound.add('water');
        this.bossFX = this.sound.add('Boss');
        this.Ricklifes = 10;// vidas de Rick
        this.lifesText = this.add.text(100,50, 'Rick´s HP: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', 
        fontSize: 75, color: 'white'}); //Texto Vidas
        this.RicklifesText = this.add.text(475,50, this.Ricklifes, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', 
        fontSize: 75, color: 'white'}); //Texto Vidas Rick;
        
        //pinchos plataformas decoracion muros
        this.bossMap = this.make.tilemap({ 
			key: 'bossMap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        this.fondoLayer = this.bossMap.createFromObjects('fondo', {name: "fondoimg", key: 'fondoimg'});
        const myTileset = this.bossMap.addTilesetImage('mundo', 'patronesTilemap');
        this.platformLayer = this.bossMap.createLayer('plataformas', myTileset);
        this.platformLayer.setCollisionByExclusion(-1, true);
        this.decoracionLayer = this.bossMap.createLayer('decoracion', myTileset);
        this.pinchos = this.bossMap.createLayer('pinchos', myTileset);
        this.pinchos.setCollisionByExclusion(-1, true);
        this.muros = this.bossMap.createLayer('muros', myTileset);
        this.muros.setCollisionByExclusion(-1, true);
    
        this.physics.world.setBoundsCollision(true, true, false, false); // Define limites del mapa
        this.puh = new Puh(this, 720, 900);// instanciación de Puh
        this.puh.setFly(true) // Llamada a método para cambiar el booleano de la clase puh que determina si vuela o no.
        this.rick = new Rick(this, 900, 1150);// instanciación de Rick
        this.activateBossSound = this.rick.bossSound = false;

        this.drop = 'WaterDrop';// gota
        this.dropObs = this.physics.add.group();// gurpo de gotas con físicas

        this.physics.add.collider(this.puh, this.platformLayer);
        this.physics.add.collider(this.puh, this.muros);
        this.physics.add.collider(this.rick, this.platformLayer);
        this.physics.add.collider(this.rick, this.muros); // habría que llamar a hacerle daño
        this.physics.add.collider(this.dropObs, this.platformLayer);
        this.physics.add.collider(this.dropObs, this.muros);

        this.physics.add.collider(this.rick, this.puh, this.gameOver.bind(this), null);// game Over
        this.physics.add.collider(this.dropObs, this.puh, this.gameOver.bind(this), null);// game Over
        this.physics.add.collider(this.puh, this.pinchos, this.gameOver.bind(this),null);

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    gameOver(){     
        this.scene.start('GameOver', 1);
        this.puh.visible = false;
        this.rick.visible = false;
        this.song.stop();   
        this.deathSound.play();
    }
    
    rickLifes(){
        this.Ricklifes--;
        this.golpeSound.play();
        this.RicklifesText.visible = false;
        this.RicklifesText = this.add.text(475,50, this.Ricklifes, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', 
        fontSize: 75, color: 'white'}); //Texto Vidas Rick
        if(this.Ricklifes == 0) this.Victory(); // Rick sin vidas
    }

    Victory(){
        this.scene.start('Victory');// escena de victoria
        this.puh.visible = false;
        this.rick.visible = false;
        this.song.stop();   
    }

    stopMusic(){
        this.song.stop();
    }

    GetPuhReference(){
        return this.puh;
    }

    randomNumbSound(){
        this.soundRandom = Math.floor(Math.random() * 200);
    }
    
    RickDrop(){
        var DropPosX = this.rick.getX();
        if(this.rick.flipX) DropPosX -= 75;// posición de la boca con Rick girado
        else DropPosX += 75;// posición de la Boca con Rick sin girar
        let waterDrop = new WaterDrop(this, DropPosX, this.rick.getY() -100, -1000, 4.5, this.drop);// instancia la gota en la posición de Rick
        this.dropObs.add(waterDrop);// añade la gota al grupo
    }

    generateObs(){
        let rnd = Math.floor(Math.random() * 6);// número aleatorio entre 0 y 5
        rnd += 5; // número aleatorio entre 5 y 10
        for(let i = 0; i < rnd; i++){
            let min = Math.ceil(48);//redondea hacia arriba
            let max = Math.floor(1400);// redonde hacia abajo
            let x = (Math.floor(Math.random() * (max - min + 1)) + min) // Posición aleatoria de x
            let waterDrop = new WaterDrop(this, x, -180, 500, 3, this.drop);
            this.dropObs.add(waterDrop);// añade la gota al grupo
        }// se generan en fución del número aleatorio
    }

    loadScene = true;
    update(t,dt){
        this.randomNumbSound();

        if(this.loadScene){
            this.scene.restart();
            this.song.stop();
            this.loadScene = false;
        }
        if((this.soundRandom == 2 && this.rick.bossSound) && !this.bossFX.isPlaying){
            this.bossFX.play();
        }
        if(this.rick.Spit){
            this.waterSound.play();
        }
        if(this.rick.damageSound){
            this.golpeSound.play();
        }
        if(this.RickLifes == 0)
        {
            this.RickDeath.play();
            
        }
        if(this.ESC.isDown){
            this.scene.launch('GamePause', {me: this.scene});
            this.scene.pause();
        }       
    }
}