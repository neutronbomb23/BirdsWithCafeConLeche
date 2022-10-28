export default class Puh extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'puh');
        this.fly = false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('puhIddle', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('puhMove', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('puhFly', {start:0, end:5}),
            frameRate: 5,
            repeat: -1
        });

        this.play('idle');
        this.body.setCollideWorldBounds(true);
        this.setScale(3);

        this.w = this.scene.input.keyboard.addKey('W');
        this.s = this.scene.input.keyboard.addKey('S');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
    }

    getX(){
        return this.x;
    }

    setFly(enabled){
        this.fly = enabled;
    }

    characterInputManager(){
        if(this.a.isDown){
            this.body.setVelocityX(-500);
            this.setFlip(true, false)
        }
        else if(this.d.isDown){
            this.body.setVelocityX(500);
            this.setFlip(false, false)
        }
        else{
            this.body.setVelocityX(0);
        }
        if (!this.fly){
            if(this.w.isDown && this.body.touching.down){
                this.body.setVelocityY(-800)
            }
            else if (this.body.touching.down){ 
                this.body.setVelocityY(0);
            }
            else if(this.body.touching.up) this.body.setVelocityY(0);
        }
        else{
            if(this.w.isDown){
                this.body.setVelocityY(-500)
            }
            else if (this.s.isDown){
                this.body.setVelocityY(500);
            }
            else{ 
                this.body.setVelocityY(200);
            }
        }
    }

    animationManager(){
        if(!this.body.touching.down){
            if(this.anims.currentAnim.key !== 'fly') {this.play('fly');}
        }
        else if (this.body.velocity.x != 0){
            if(this.anims.currentAnim.key !== 'move') {this.play('move');}
        }
        else{
            if(this.anims.currentAnim.key !== 'idle') {this.play('idle');}
        }
    }
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
        this.characterInputManager(this.fly);
        this.animationManager();
    }
}