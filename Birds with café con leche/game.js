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
    this.load.image('skull', 'assets/obstacles/skull.png');
    this.load.image('gameover', 'assets/go.jpg');
}

create(){
    

    this.physics.world.setBoundsCollision(true,true,true,false);
    this.add.image(800,500, 'background');
    this.gameover = this.add.image(700,600, 'gameover');
    this.gameover.visible = false;

    this.scoreText = this.add.text(16,16, 'Points: 0', {
        fontSize: '40px',
        fill: '#fff',
        fontFamily: 'verdana, arial, sans-serif' 
    });
    
    this.platform = this.physics.add.image(900,300, 'platform');
    this.skull = this.physics.add.image(400,100, 'skull');

    this.puh = this.physics.add.image(400,20, 'puh');
    this.puh.body.allowGravity = false;

    this.skull.setBounce(3);
    let velocity = 100 * Phaser.Math.Between(1.3,2);

    if(Phaser.Math.Between(0,10)>5){
        velocity = 0 - velocity;
    }
    this.skull.setVelocity(velocity, 10);
    
    
    this.puh.setCollideWorldBounds(true);
    this.skull.setCollideWorldBounds(true);
    this.platform.body.allowGravity = false;
    this.physics.add.collider(this.puh, this.platform);
    this.physics.add.collider(this.skull, this.platform, this.addScore, null, this);
   

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

update(){
   
    if(this.cursors.left.isDown){
        this.platform.setVelocityX(-200);
    }
    else if(this.cursors.right.isDown){
        this.platform.setVelocityX(200);
    }
    else{
        this.platform.setVelocityX(0);
    }
    if(this.cursors.up.isDown){
        this.platform.setVelocityY(-200);
    }
    else if(this.cursors.down.isDown){
        this.platform.setVelocityY(200)
    }
    else{
        this.platform.setVelocityY(0);
        }

     if(this.skull.y > 1000) {

        console.log('fin');
        this.scene.pause();
        this.gameover.visible = true;

        }
    }

   
}