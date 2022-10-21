import FallingObjects from "./fallingObjects.js";
import { GameOver } from "./GameOver.js";
import Puh from './puh.js';
<<<<<<< Updated upstream
import PuhAn from './puhAnims'
=======

>>>>>>> Stashed changes
const DEBUG = false;

const CAMPOSY = 400; var camCurrentPosY = CAMPOSY; // Respecto a Puh
const CAMERASPEED = 100; // Velocidad a la que sube en funcion del tiempo
var cameraMoves = true;
const TOP = 1100; // punto en el eje y en el que se detiene la camara

const PUHX = 700; const PUHY = 1500; // Posiciones iniciales de puh

var startTime; // Runtime en el momento en el que empieza la escena

export class Game extends Phaser.Scene{
constructor(){
    super({key: 'game'}); // llama a la clase superior (phaser.js)
}

init(){
    this.score = 0;
}
preload(){ // precarga los assets
    this.load.image('background', 'assets/backgroundd.png');// fondo
    this.load.spritesheet('puhIdle', 'assets/puh/puh.png', {frameWidth:32,  frameHeight: 32});// idle de Puh
    this.load.spritesheet('puhMove', 'assets/puh/Walk.png', {frameWidth:32,  frameHeight: 32});// Movimineto de Puh
    this.load.image('platform', 'assets/platform.png');// plataforma
    this.load.image('floor', 'assets/floor.png');// suelo
    this.load.image('bone', 'assets/obstacles/bone.png');// hueso
    this.load.image('birdSkull', 'assets/obstacles/birdSkull.png');// calavera de pájaro
    this.load.image('birdClaw', 'assets/obstacles/birdClaw.png');// garra de pájaro
    this.load.audio('song','assets/audio/cty.mp3');// sonido
}

create(){ // se ejecura una sola vez cuando filnaliza el preload
    startTime = this.time.now;
    cameraMoves = true;
    this.lastTimeObbs = 0;
    this.song = this.sound.add('song');
    this.song.play();

    //this.physics.world.setBoundsCollision(true,true,true, false); // Define limites del mapa
    this.add.image(720,410, 'background'); // Imagen fondo

    new Puh(this, 600, 1000);// instanciación de Puh
    new PuhAn(this, 600, 1000);// instanciación de Puh


    this.initScore();


    /*this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('puh', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });*/

    this.initPuh();
    
    this.platform = this.physics.add.image(700,1650, 'platform').setImmovable(true).setScale(1);
    this.platform.body.allowGravity = false;

    this.floor = this.physics.add.image(720,800, 'floor').setImmovable(true).setScale(1);
    this.floor.body.allowGravity = false;

    /*let velocity = 100 * Phaser.Math.Between(1.3,2);

    if(Phaser.Math.Between(0,10)>5){
        velocity = 0 - velocity;
    }
    */
    
    this.physics.add.collider(this.puh, this.platform);// colisión entre Puh y la plataforma
    this.physics.add.collider(this.puh, this.floor);// colisión entre Puh y el suelo
    
    this.platform.setCollideWorldBounds(true);
    this.platform.body.onWorldBounds=true;
    this.physics.add.collider(this.platform, this.floor);
    
    this.physics.add.collider(this.puh, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdSkull, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);
    this.obstaclesList = ['bone', 'birdClaw', 'birdSkull']
    this.obstacles = this.physics.add.group();

    this.physics.add.collider(this.obstacles, this.puh);
    this.physics.add.collider(this.obstacles, this.platform);
    
    //CAMARA
    this.initCamera();

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.cursors = this.input.keyboard.createCursorKeys();     
}

initScore(){
    this.scoreText = this.add.text(16,16, 'Points: 0', {
        fontSize: '40px',
        fill: '#fff',
        fontFamily: 'verdana, arial, sans-serif' 
    });
}

initCamera(){
    this.cameras.main.startFollow(this.puh); // Sigue a puh 
    this.cameras.main.setFollowOffset(0, CAMPOSY); // Distancia entre el la camara y puh
    this.cameras.main.setLerp(0, 0.1);
    this.cameras.main.scrollX = false;
}

initPuh(){
    this.puh = this.physics.add.image(PUHX, PUHY, 'puh').setImmovable(false).setScale(2);
    
    this.puh.body.allowGravity = true;
    this.puh.setGravityY(9000);
    //this.puh.setCollideWorldBounds(true);
}

updateCamera(){
    var runTimeSecs = (this.time.now - startTime) * 0.001; // Tiempo desde que se inicio la escena
    if(DEBUG)console.log(runTimeSecs)
    camCurrentPosY = CAMPOSY + runTimeSecs*CAMERASPEED - (PUHY - this.puh.y); // Distancia entre el la camara y puh
    this.cameras.main.setFollowOffset(0, camCurrentPosY); // Set de la posición y de la camara
}

addScore(){
        this.score++;
        this.scoreText.setText('Points: ' + this.score);
        console.log('1 punto');
}


characterInputManager(fly = false){

    if(this.keyA.isDown){
        this.puh.setVelocityX(-400);
        //this.puh.anims.play('walk', true);
    }
    else if(this.keyD.isDown){
        this.puh.setVelocityX(400);
    }
    else{
        this.puh.setVelocityX(0);
    }
    if (!fly){
        if(this.keyW.isDown && this.puh.body.touching.down){
            this.puh.setVelocityY(-2000)
        }
        else if (this.puh.body.touching.down){ 
            this.puh.setVelocityY(0);
        }
        else if(this.puh.body.touching.up) this.puh.setVelocityY(0);
    }
    else{
        if(this.keyW.isDown){
            this.puh.setVelocityY(-1000)
        }
        else if (this.keyS.isDown){
            this.puh.setVelocityY(250);
        }
        else{ 
            this.puh.setVelocityY(100);
        }
    }
    if(this.keyQ.isDown){
        this.song.stop();
        this.scene.restart();
    }
}

gameOver(){
    this.puh.visible = false;
    console.log('fin');
    this.song.stop();
    this.scene.start('GameOver');
}

generateObs(){
    let idObs = this.obstaclesList[Math.floor(Math.random() * 3)]
    let toni =  new FallingObjects(this, 100, idObs);
    this.obstacles.add(toni);

    //toni.setBounce(2);  
    
    console.log(idObs);
}
update(t,dt){// se ejecura una vez por frame
 
    this.lastTimeObbs += dt;
    if(this.lastTimeObbs > 1000)
    {
        this.generateObs();
        console.log(this.lastTimeObbs);
        this.lastTimeObbs = 0;
    }

    if(cameraMoves){
        this.updateCamera(); // Actualiza su posición respecto a puh
    }
    else{
        this.cameras.main.stopFollow(); // Se queda quieta en el eje Y
    }

    if(DEBUG){
    console.log(this.puh.y)
    }

    this.characterInputManager(true);


        if(this.puh.y > 1600) {
            this.gameOver();
        }

        if (camCurrentPosY > TOP){ // Detiene el seguimiento de camara
            cameraMoves = false;
        }
    }
}