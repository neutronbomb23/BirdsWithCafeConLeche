export default class Puh extends Phaser.GameObjects.Sprite{
constructor(scene, x, y){
    super(scene, x, y, 'puh');

    this.scene.add.existing(this);

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
        this.x -= 400 * dt/1000;
    }
    else if(this.d.isDown){
        this.x += 400 * dt/1000;
    }
    if (!fly){
        if(this.w.isDown && this.puh.body.touching.down){
            this.y -= 400 * dt/1000;
        }
    }
    else{
        if(this.w.isDown){
            this.y -= 400 * dt/1000;
        }
        else if (this.s.isDown){
            this.y += 400 * dt/1000;
        }
        else{ 
            this.y += 100 * dt/1000;
        }
    }
}


preUpdate(t, dt){
    super.preUpdate(t,dt);

    this.characterInputManager(true, dt);
}
}