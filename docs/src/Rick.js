export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.puh = this.scene.GetPuhReference();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.dash = false;// ataque
        this.first = true;// booleano para asegurar que el timer solo se inicia a cero la primera vez
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

       /* let Attack = this.scene.tweens.add({
            targets: this,
            duration: 1000,
            ease: 'Sine.easeInOut',
            onUpdate: function (tween)
            {
                const value = Math.floor(tween.getValue());

                image.setTint(Phaser.Display.Color.GetColor(20, 30, 40));
            },
            yoyo: true,
            repeat: -1,
            delay: 10
        });

        Attack.pause();*/


        this.play('walk');
        this.body.setCollideWorldBounds(true);
        this.setScale(8);
        this.setFlip(false, false);

        this.scene.Damage = this.scene.tweens.add({
            targets: this,
            scale: this.scale*0.7,
            duration: 800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 10
        });

        console.log(this.scene.Damage);
        this.scene.Damage.pause();
        this.scene.Damage.resume();
        
    }

    movementManager(){
        let puhPosX = this.puh.getX();
        let puhPosY = this.puh.getY();
        let distY = Math.abs(this.y - puhPosY);
        let range = this.x - puhPosX;
        //console.log(this.dash);
        if(!this.dash && distY < 110) 
        {
            if(this.x > 200 && this.x < 1300)this.dash = true;// si no está ya en los extremos
            if(range > 0)// puh está a la izquierda
            {
                this.body.setVelocityX(-900);
                this.setFlip(true, false);
            }
            else// puh está a la derecha
            {
                this.body.setVelocityX(900);
                this.setFlip(false, false);
            }
            if(this.anims.currentAnim.key !== 'walk')// animación
            {
            
            this.play('walk');
            }
        }
        else if(this.dash && (this.x <= 200 || this.x >= 1300))// daño a Rick
        {
            if(this.anims.currentAnim.key === 'walk')
            {
                this.body.setVelocityX(0);// para a Rick
                this.play('idleR');// animación
                this.scene.Damage.resume();//tween de daño
                if(this.first)
                {
                    this.timer = 0;// contador a 0
                    this.first = false;// booleano a false para no reiniciar el contador a cero
                }
            }
            if(this.timer >= 1000){
                this.dash = false;// fin del daño y del ataque
                this.first = true;// booleano a true para reiniciar el contador en el siguiente ataque
                this.scene.Damage.pause();// tween pausado
                this.y = 1250;// para que no se caiga por el cambio de escala
                this.setScale(8);// vuelve a su escala inicial
            }
        }

        else if(!this.dash)
        {
            this.walking(); // patrulla   
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