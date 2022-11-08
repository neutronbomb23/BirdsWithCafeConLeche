export default class FallingObjects extends Phaser.GameObjects.Sprite{
    constructor(scene, y, name){
        let min = Math.ceil(48); let max = Math.floor(1400);
        const xCoord = (Math.floor(Math.random() * (max - min + 1)) + min) // Posición aleatoria
        super(scene, xCoord, y, name);
        this.name = name;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.initAnimations(scene, name);

        this.body.setCollideWorldBounds(true);

        this.INITIALTIME= -1; // se inicializa luego
        this.BOUNCE_VELOCITY_X = 600;
        this.BOUNCE_VELOCITY_Y = -500;
        const LIFETIME = 2;
    }

    RandomInt(min, max) { // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initAnimations(scene, name){
        this.scene.anims.create({
            key: 'bone',
            frames: scene.anims.generateFrameNumbers('boneAn', {start:0, end:7}),
            frameRate: 20,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'skull',
            frames: scene.anims.generateFrameNumbers('skullAn', {start:0, end:7}),
            frameRate: 20,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'claw',
            frames: scene.anims.generateFrameNumbers('clawAn', {start:0, end:7}),
            frameRate: 20,
            repeat: -1
        });
        
        this.play(name);
    }

    updateAnimations(){
        if (this.body.touching.down && this.body.speed <= 1) { this.anims.timeScale = 0; }
    }

    colisionManager(){
        if(this.body.touching.down){ // Si colisionan por abajo
            if (this.RandomInt(0,2)  === 0){ this.body.setVelocityX(this.BOUNCE_VELOCITY_X); } // Derecha
            else { this.body.setVelocityX(-this.BOUNCE_VELOCITY_X); } // Izquierda
            this.body.setVelocityY(this.BOUNCE_VELOCITY_Y);
            if (this.name == 'skull') {this.BOUNCE_VELOCITY_Y /= 2;  this.BOUNCE_VELOCITY_X /= 2;} 
        }
        else if(this.body.touching.left){
            this.body.setVelocityX(this.BOUNCE_VELOCITY_X)
        }
        else if(this.body.touching.right){
            this.body.setVelocityX(this.BOUNCE_VELOCITY_X)
        }
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        if(this.INITIALTIME < 0) { 
            this.INITIALTIME = dt * t / 10000
        }

        this.colisionManager();
        this.updateAnimations();

        let currentTime = dt * t / 10000;
        if(currentTime - this.INITIALTIME >= this.LIFETIME){
            this.destroy();
        }
    }
}

