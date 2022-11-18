export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.puh = this.scene.GetPuhReference();
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
            frames: scene.anims.generateFrameNumbers('RickWalk', {start:0, end:23}),
            frameRate: 5,
            repeat: -1
        });

        this.play('idleR');
        this.body.setCollideWorldBounds(true);
        this.setScale(8);
    }

    movementManager(){
        let puhPosX = this.puh.getX();
        let puhPosY = this.puh.getY();
        let distY = Math.abs(this.y - puhPosY);
        let range = this.x - puhPosX;
        console.log(puhPosX);
        if(Math.abs(range) <= 500 && distY < 110) 
        {
            if(range > 0)
            {
                this.body.setVelocityX(-200);
                this.setFlip(true, false);
            }
            else 
            {
                this.body.setVelocityX(200);
                this.setFlip(false, false);
            }
            if(this.anims.currentAnim.key !== 'walk')
            {
            this.play('walk');
            }
        }
        else{
            if(this.anims.currentAnim.key !== 'idleR') 
            {
                this.body.setVelocityX(0);
                this.play('idleR');
            }
        }
    }
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
        this.movementManager();
    }
}