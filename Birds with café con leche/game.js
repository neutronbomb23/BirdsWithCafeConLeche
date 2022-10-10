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
    this.load.image('gameover', 'assets/go.jpg');
}

create(){
    this.physics.world.setBoundsCollision(true,true,true, false);
    this.add.image(800,500, 'background');
    this.gameover = this.add.image(700, 600, 'gameover');
    this.gameover.visible = false;

    this.scoreText = this.add.text(16,16, 'Points: 0', {
        fontSize: '40px',
        fill: '#fff',
        fontFamily: 'verdana, arial, sans-serif' 
    });
    
    const obstacles = this.physics.add.group();

    const obstaclesList = ['bone', 'birdClaw', 'birdSkull']

    const obsGen = () => {
        const xCoord = Math.random() * 1700
        let obsGen = obstaclesList[Math.floor(Math.random() * 3)]
        obstacles.create(xCoord, 10, obsGen)
    }

    const obsGenLoop = this.time.addEvent({
        delay: 500,
        callback: obsGen,
        loop: true,
    });

    this.platform = this.physics.add.image(900,500, 'platform');
    this.platform.body.allowGravity = false;

    this.floor = this.physics.add.image(900,950, 'floor').setImmovable(true).setScale(3);
    this.floor.body.allowGravity = false;

    this.puhInit();


    let velocity = 100 * Phaser.Math.Between(1.3,2);

    if(Phaser.Math.Between(0,10)>5){
        velocity = 0 - velocity;
    }
    
    

    this.platform.setCollideWorldBounds(true);
    this.platform.body.onWorldBounds=true;

    //this.physics.add.collider(this.bone, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdSkull, this.platform, this.addScore.bind(this), null);
    //this.physics.add.collider(this.birdClaw, this.platform, this.addScore.bind(this), null);

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


    this.cursors = this.input.keyboard.createCursorKeys();     
}

saltin(){
        this.scene.pause()
}
addScore(){
        this.score++;
        this.scoreText.setText('Points: ' + this.score);
        console.log('1 punto');
}

puhInit(){
    this.puh = this.physics.add.image(400,20, 'puh').setScale(3);;
    this.puh.body.allowGravity = false;
    this.puh.setCollideWorldBounds(true);
    this.physics.add.collider(this.puh, this.platform);
    this.physics.add.collider(this.puh, this.floor);
}

characterInputManager(){
    if(this.keyA.isDown){
        this.puh.setVelocityX(-200);
    }
    else if(this.keyD.isDown){
        this.puh.setVelocityX(200);
    }
    else{
        this.puh.setVelocityX(0);
    }
    if(this.keyW.isDown){
        this.puh.setVelocityY(-200);
    }
    else if(this.keyS.isDown){
        this.puh.setVelocityY(200)
    }
    else{
        this.puh.setVelocityY(0);
    }
}

update(){
    this.characterInputManager();

    if(this.keyQ.isDown){
        this.scene.start('game');
    }

        if(this.puh.y > 950) {
            console.log('fin');
            this.gameover.visible = true;
            this.platform.visible = false;
            //this.scene.pause();
        }
    }
}