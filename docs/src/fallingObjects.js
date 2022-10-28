export default class FallingObjects extends Phaser.GameObjects.Sprite{

    constructor(scene, y, name){
        const xCoord = Math.random() * 1440 // Posición aleatoria
        super(scene, xCoord, y, name);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.scene.add.image(0,0, name);
      
        //this.body.setBounce(10,10);
        this.body.setCollideWorldBounds(true);
        this.velocity = 0;
    }

    RandomInt(min, max) { // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    colisionManager(){
        console.log(this.body.touching.down)
        if(this.body.touching.down){ // Si colisionan por abajo
            let dir = this.RandomInt(0,2)
            console.log(dir);
            if (dir  === 0){ // Derecha
                this.body.setVelocityX(200);
            }
            else { // Izquierda
                this.body.setVelocityX(-200);
            }
            this.body.setVelocityY(-350);
        }
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);

        this.colisionManager();
    }
}

