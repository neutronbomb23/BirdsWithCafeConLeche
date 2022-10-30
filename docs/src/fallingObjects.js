export default class FallingObjects extends Phaser.GameObjects.Sprite{
    constructor(scene, y, name){
        let min = Math.ceil(48); let max = Math.floor(1400);
        const xCoord = (Math.floor(Math.random() * (max - min + 1)) + min) // Posición aleatoria
        super(scene, xCoord, y, name);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.scene.add.image(0,0, name);
    
        this.body.setCollideWorldBounds(true);

        this.INITIALTIME= -1; // se inicializa luego
        this.BOUNCE_VELOCITY_X = 200;
        const LIFETIME = 15;
    }

    RandomInt(min, max) { // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    colisionManager(){
        if(this.body.touching.down){ // Si colisionan por abajo
            let dir = this.RandomInt(0,2)
            if (dir  === 0){ this.body.setVelocityX(this.BOUNCE_VELOCITY_X); } // Derecha
            else { this.body.setVelocityX(-this.BOUNCE_VELOCITY_X); } // Izquierda
            this.body.setVelocityY(-350);
        }
        else if(this.body.touching.left){
            this.body.setVelocityX(this.BOUNCE_VELOCITY_X)
        }
        else if(this.body.touching.right){
            this.body.setVelocityX(this.BOUNCE_VELOCITY_X)
        }
    }

    preUpdate(t,dt){
        if(this.INITIALTIME < 0) { 
            this.INITIALTIME = dt * t / 10000
        }

        super.preUpdate(t,dt);
        this.colisionManager();

        let currentTime = dt * t / 10000;
        if(currentTime - this.INITIALTIME >= this.LIFETIME){
            this.destroy();
        }
    }
}

