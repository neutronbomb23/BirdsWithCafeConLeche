import Puh from './puh.js';

export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.anims.create({
            key: 'idleR',
            frames: scene.anims.generateFrameNumbers('RickIddle', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('RickWalk', {start:0, end:24}),
            frameRate: 5,
            repeat: -1
        });

        this.play('idleR');
        this.body.setCollideWorldBounds(true);
        this.setScale(8);
    }

    /*getX(){
        return this.x;
    }

    animationManager(){
        console.log(Puh.getX());
        console.log(this.x);
        if(Math.abs(Puh.getX() - this.x) < 1000) 
        {
            console.log('entra');
            if(Puh.getX - this.getX < 0)this.setFlip(true, false);
            else this.setFlip(false, false);
            this.play('walk');
        }
        else{
            console.log('else');
           this.play('idleR');
        }
    }*/
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
       //this.animationManager();
    }
}