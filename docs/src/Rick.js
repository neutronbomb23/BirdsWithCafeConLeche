export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.puh = this.scene.GetPuhReference();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.dash = false;// ataque
        this.timer = 0;

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

        
        let tween = this.scene.tweens.add({
            targets: this,
            x: 700,
            duration: 1000,
            ease: 'Sine.easeInOut',
            //yoyo: true,
            repeat: -1,
            delay: 10
        });
        

        this.play('walk');
        this.body.setCollideWorldBounds(true);
        this.setScale(8);
        this.setFlip(false, false);
    }

    movementManager(){
        let puhPosX = this.puh.getX();
        let puhPosY = this.puh.getY();
        let distY = Math.abs(this.y - puhPosY);
        let range = this.x - puhPosX;
        console.log(this.dash);
        if(!this.dash && distY < 110) 
        {
            this.dash = true;
            if(range > 0)
            {
                this.body.setVelocityX(-900);
                this.setFlip(true, false);
            }
            else
            {
                this.body.setVelocityX(900);
                this.setFlip(false, false);
            }
            if(this.anims.currentAnim.key !== 'walk')
            {
            this.play('walk');
            }
            this.timer = 0;
        }
        if(this.dash && (this.x <= 200 || this.x >= 1300))
        {
            //this.scene.TweenAnimation();
            if(this.anims.currentAnim.key !== 'idelR')
            {
                this.body.setVelocityX(0);
                this.play('idleR');
            }
            if(this.timer >= 150){
                console.log("entra");
                this.dash = false;
            }
        }

        if(!this.dash)
        {
            this.walking();      
        }
    }

    walking()
    {
        if(this.flipX)
        {
            this.body.setVelocityX(-200);// movimiento hacia la izquierda
        }
        else 
        {
            this.body.setVelocityX(200);// movimiento hacia la derecha
        }
        //console.log(this.x);
        if(this.x >= 1150)
        {
            this.setFlip(true, false);// extremo derecho
        }
        else if(this.x <= 200)
        {
            this.setFlip(false, false);// extremo izquierdo
        }
    
        if(this.anims.currentAnim.key !== 'walk')// animación de andar
        {
            this.play('walk');
        }
    }
    
    preUpdate(t, dt){
        this.timer += dt;
        super.preUpdate(t,dt);
        this.movementManager();
    }
}