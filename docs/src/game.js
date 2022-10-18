import { GameOver } from "./GameOver.js";

const DEBUG = true;

export class Game extends Phaser.Scene{

constructor(){
    super({key: 'game'});
}

init(){
    this.score = 0;
}
preload(){
    this.load.image('background', 'assets/backgroundd.png');
    this.load.image('puh', 'assets/puh/puh.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('floor', 'assets/floor.png');
    this.load.image('bone', 'assets/obstacles/bone.png');
    this.load.image('birdSkull', 'assets/obstacles/birdSkull.png');
    this.load.image('birdClaw', 'assets/obstacles/birdClaw.png');
    this.load.audio('song','assets/audio/cty.mp3');
}

create(){
    this.song = this.sound.add('song');
    this.song.play();

    this.physics.world.setBoundsCollision(true,true,true, false); // Define limites del mapa
    this.add.image(720,410, 'background'); // Imagen fondo

    this.initScore();
    
    this.summonObstacles();

    /*this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('puh', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });*/

    this.puhInit();
    
    this.platform = this.physics.add.image(700,1650, 'platform').setImmovable(true).setScale(1);
    this.platform.body.allowGravity = false;

    this.floor = this.physics.add.image(720,800, 'floor').setImmovable(true).setScale(1);
    this.floor.body.allowGravity = false;

    /*let velocity = 100 * Phaser.Math.Between(1.3,2);

    if(Phaser.Math.Between(0,10)>5){
        velocity = 0 - velocity;
    }
    */
    
    this.physics.add.collider(this.puh, this.platform);
    this.physics.add.collider(this.puh, this.floor);

    this.platform.setCollideWorldBounds(true);
    this.platform.body.onWorldBounds=true;
    this.physics.add.collider(this.platform, this.floor);
    
    this.physics.add.collider(this.puh, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdSkull, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);


    //CAMARA
    this.cameras.main.startFollow(this.puh); // Sigue a puh 
    this.cameras.main.setFollowOffset(0, 400) // Distancia entre el la camara y puh


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

addScore(){
        this.score++;
        this.scoreText.setText('Points: ' + this.score);
        console.log('1 punto');
}

summonObstacles(){
    const obstacles = this.physics.add.group();
    const obstaclesList = ['bone', 'birdClaw', 'birdSkull']

    const obsGen = () => {
        const xCoord = Math.random() * 1500
        let obsGen = obstaclesList[Math.floor(Math.random() * 3)]
        obstacles.create(xCoord, 10, obsGen)
    }

    const obsGenLoop = this.time.addEvent({
        delay: 500,
        callback: obsGen,
        loop: true,
    });
}

puhInit(){
    this.puh = this.physics.add.image(400,400, 'puh').setImmovable(false).setScale(2);
    this.puh.setBounce(3);
    this.puh.body.allowGravity = true;
    this.puh.setGravityY(9000);
    this.puh.setCollideWorldBounds(true);
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
        this.scene.start('game');
    }
}

gameOver(){
    this.puh.visible = false;
    console.log('fin');
    this.song.stop();
    this.scene.start('GameOver');
}


update(){
    if(DEBUG){
    console.log(this.puh.y)
    }

    this.characterInputManager(true);

    if(this.keyQ.isDown){
        this.scene.start('game');
    }

        if(this.puh.y > 1600) {
           
            this.gameOver();

        }

        if (this.puh.y < 300){ // Para el seguimiento de camara
            this.cameras.main.stopFollow();
        }
    }
}