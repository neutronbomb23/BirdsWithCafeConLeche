export default class Puh extends Phaser.GameObjects.Sprite{
constructor(scene, x, y){
    super(scene, x, y, 'puh');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.scene.anims.create({
        key: 'iddle',
        frames: scene.anims.generateFrameNumbers('puhIddle', {start:0, end:3}),
        frameRate: 5,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'move',
        frames: scene.anims.generateFrameNumbers('puhIddle', {start:0, end:5}),
        frameRate: 5,
        repeat: -1
    });
     //if(this.anim.currentAnim.key === 'move')this.play

    this.setScale(3);
    this.play('iddle');

    this. w = this.scene.input.keyboard.addKey('W');
    this. s = this.scene.input.keyboard.addKey('S');
    this. a = this.scene.input.keyboard.addKey('A');
    this. d = this.scene.input.keyboard.addKey('D');
}

characterInputManager(fly = false, dt){
    if(this.a.isDown){
        this.body.setVelocityX(-400);
    }
    else if(this.d.isDown){
        this.body.setVelocityX(400);
    }
    else{
        this.body.setVelocityX(0);
    }
    if (!fly){
        if(this.w.isDown && this.body.touching.down){
            this.body.setVelocityY(-2000)
        }
        else if (this.body.touching.down){ 
            this.body.setVelocityY(0);
        }
        else if(this.body.touching.up) this.puh.setVelocityY(0);
    }
    else{
        if(this.w.isDown){
            this.body.setVelocityY(-1000)
        }
        else if (this.s.isDown){
            this.body.setVelocityY(250);
        }
        else{ 
            this.body.setVelocityY(100);
        }
    }
}


preUpdate(t, dt){
    super.preUpdate(t,dt);

    this.characterInputManager(true, dt);
}
}