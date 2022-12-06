export default class Claw extends Phaser.GameObjects.Sprite{
    constructor(scene, y, name){
        let min = Math.ceil(48); let max = Math.floor(1400);
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
        this.LIFETIME = 10; 
    }

    initAnimations(scene, name){
        this.scene.anims.create({
            key: 'birdClaw',
            frames: scene.anims.generateFrameNumbers('clawAn', {start:0, end:7}),
            frameRate: 20,
            repeat: -1
        }); 
        this.play(name); // Se establece la animación del objeto
    }
    
    RandomInt(min, max) { // Funcion Aux
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    preUpdate(t,dt){
        super.preUpdate(t,dt);
        this.TIME += dt / 1000;
        //console.log(this.TIME)
        if(this.TIME >= this.LIFETIME){ this.destroy(); }
    }
}