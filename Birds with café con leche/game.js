export class Game extends Phaser.Scene{

constructor(){
    super({key: 'game'});
}

preload(){

    this.load.image('background', 'images/backgroundd.png');
    this.load.image('puh', 'images/puh.png');
    this.load.image('platform', 'images/platform.png')

}

create(){

    this.puh = this.physics.add.image(800,50, 'puh');
    this.puh.setCollideWorldBounds(true);
    this.puh.body.allowGravity = false;

    this.add.image(800,500, 'background');
    this.platform = this.physics.add.image(400,300, 'platform').setImmovable();
    this.platform.body.allowGravity = false;

    this.physics.add.collider(this.puh, this.platform);
    this.cursors = this.input.keyboard.createCursorKeys();
}

update(){
   
    if(this.cursors.left.isDown){
        this.puh.setVelocityX(-200);
    }
    else if(this.cursors.right.isDown){
        this.puh.setVelocityX(200);
    }
    else{
        this.puh.setVelocityX(0);
    }
    if(this.cursors.up.isDown){
        this.puh.setVelocityY(-200);
    }
    else if(this.cursors.down.isDown){
        this.puh.setVelocityY(200)
    }
    else{
        this.puh.setVelocityY(0);
    }
}






}