export default class FallingObjects extends Phaser.GameObjects.Sprite{
    constructor(scene, y, name){
        let min = Math.ceil(48);//redondea hacia arriba
        let max = Math.floor(1400);// redonde hacia abajo
        const xCoord = (Math.floor(Math.random() * (max - min + 1)) + min) // Posición aleatoria
        super(scene, xCoord, y, name);
        this.name = name;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1.5);
        this.initAnimations(scene, name);

        this.body.setCollideWorldBounds(true);

        this.TIME = 0; // se inicializa luego
        this.BOUNCE_VELOCITY_X = 600;
        this.BOUNCE_VELOCITY_Y = -500;
        this.LIFETIME = 6; 
    }

    RandomInt(min, max){ // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initAnimations(scene, name){
        //Se crea la animacion correspondiente
        if(name == 'bone'){
            this.scene.anims.create({
                key: 'bone',
                frames: scene.anims.generateFrameNumbers('boneAn', {start:0, end:7}),
                frameRate: 20,
                repeat: -1
            });
        }
        else if(name == 'birdSkull'){
            this.scene.anims.create({
                key: 'birdSkull',
                frames: scene.anims.generateFrameNumbers('skullAn', {start:0, end:7}),
                frameRate: 20,
                repeat: -1
            });
        }
        
        this.play(name); // Se establece la animación del objeto
    }

    updateAnimations(){
        // CALAVERA (si se queda quieto se detiene su animación)
        if (this.body.onFloor() && this.body.speed <= 1) { this.anims.timeScale = 0; }
    }

    colisionManager(){
        if(this.x <= 30) { this.body.setVelocityX(this.BOUNCE_VELOCITY_X);}
        else if(this.x >= 1425) { this.body.setVelocityX(-this.BOUNCE_VELOCITY_X);}
        if(this.body.onFloor()){ // Si colisiona por abajo
            if (this.RandomInt(0,2)  === 0){ this.body.setVelocityX(this.BOUNCE_VELOCITY_X); } // Derecha en X
            else { this.body.setVelocityX(-this.BOUNCE_VELOCITY_X); } // Izquierda en X
            this.body.setVelocityY(this.BOUNCE_VELOCITY_Y); // Aplica velocidad en Y

            if (this.name == 'birdSkull') {this.BOUNCE_VELOCITY_Y /= 2;  this.BOUNCE_VELOCITY_X /= 2;} // Decrementa la fuerza del rebote en la calavera
        } 
        else if(this.body.onWall()){ this.body.setVelocityX(this.BOUNCE_VELOCITY_X) } // Si colisiona por la izquierda
        else if(this.body.onWall()){ this.body.setVelocityX(-this.BOUNCE_VELOCITY_X) } // Si colisiona por la derecha
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        this.TIME += dt / 1000;

        this.colisionManager();
        this.updateAnimations();

        if(this.TIME >= this.LIFETIME){ this.destroy(); }
    }
}