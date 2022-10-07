export class Game extends Phaser.Scene{

constructor(){
    super({key: 'game'});
}

preload(){

    this.load.image('background', 'images/backgroundd.png');
    this.load.image('puh', 'images/puh.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('skull', 'images/skull.png');

}

create(){

    this.physics.world.setBoundsCollision(true,true,true,false);

    this.add.image(800,500, 'background');
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
    this.physics.add.collider(this.skull, this.platform);

    this.cursors = this.input.keyboard.createCursorKeys();
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
    }
}