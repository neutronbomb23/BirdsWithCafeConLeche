export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');
        this.fly = false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('RickIddle', {start:0, end:25}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('puhMove', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.play('idle');
        this.body.setCollideWorldBounds(true);
        this.setScale(4);
    }

    getX(){
        return this.x;
    }
    /*animationManager(){
        if(!this.body.touching.down){
            if(this.anims.currentAnim.key !== 'fly') {this.play('fly');}
        }
        else if (this.body.velocity.x != 0){
            if(this.anims.currentAnim.key !== 'move') {this.play('move');}
        }
        else{
            if(this.anims.currentAnim.key !== 'idle') {this.play('idle');}
        }
    }*/
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
        //this.characterInputManager(this.fly);
        //this.animationManager();
    }
}