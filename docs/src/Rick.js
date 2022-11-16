export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        let puh = scene.GetGetPuhReference;
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

    animationManager(){
        /// Puh no existe destro de rick, ademas getX es una funcion de puh por lo que this.getX() no tiene sentido sin definir antes getX() en rick
        //let puhPos = puh.getX;
        //console.log(puhPos);
        //console.log(this.getX());
        let range = 600 - this.x;;// rango de persecución
        console.log(range);
        if(Math.abs(range) <= 300) 
        {
            if(this.anims.currentAnim.key !== 'walk'){
            console.log('entra');
            if(range < 0)this.setFlip(true, false);
            else this.setFlip(false, false);
            this.play('walk');
            }
        }
        else{
            if(this.anims.currentAnim.key !== 'idleR') {
            console.log('else');
           this.play('idleR');
            }
        }
    }
    
    preUpdate(t, dt){
        super.preUpdate(t,dt);
        this.animationManager();
    }
}