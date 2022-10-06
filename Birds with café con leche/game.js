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

    this.add.image(800,500, 'background');
    this.puh = this.physics.add.image(800,50, 'puh');


    this.platform = this.physics.add.image(400,300, 'platform');
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);
    //this.platform.setVelocity(-100,50);
    this.puh.body.allowGravity = false;
    this.puh.setVelocity(-100,100);

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
}






}