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
        this.setScale(10);
    }

    getX(){
        return this.x;
    }

    animationManager(){
        if(Math.abs(Puh.getX - this.getX) < 400) this.play('walk');
        else{
           this.play('idleR');
        }
    }
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
       this.animationManager();
    }
}