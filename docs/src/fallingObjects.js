export default class FallingObjects extends Phaser.GameObjects.Sprite{
    constructor(scene, y, name){
        const xCoord = Math.random() * 1440 // Posición aleatoria
        super(scene, xCoord, y, name);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.scene.add.image(0,0, name);
    
        this.body.setCollideWorldBounds(true);
        this.INITIALTIME= -1; // se inicializa luego
        this.LIFETIME = 10;

        this.init = true;
    }

    RandomInt(min, max) { // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    colisionManager(){
        if(this.body.touching.down){ // Si colisionan por abajo
            let dir = this.RandomInt(0,2)
            if (dir  === 0){ this.body.setVelocityX(200); } // Derecha
            else { this.body.setVelocityX(-200); } // Izquierda
            this.body.setVelocityY(-350);
        }
    }

    preUpdate(t,dt){
        if(this.init){ // cambiar?
            this.INITIALTIME = dt * t / 10000
            this.init = false;
        }
        super.preUpdate(t,dt);

        this.colisionManager();
        let currentTime = dt * t / 10000;

        if(currentTime -this.INITIALTIME >= this.LIFETIME){
            this.destroy()
            console.log("Destruido")
        }
    }
}

