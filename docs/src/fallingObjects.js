export default class FallingObjects extends Phaser.GameObjects.Sprite{

    constructor(scene, y, name){
        const xCoord = Math.random() * 1500// posición aleatoria
        super(scene,xCoord,y, name);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.scene.add.image(0,0, name);
      
        //this.body.setBounce(2,2);
       // this.body.setCollideWorldBounds(true);
    }



    preupdate(t,dt){

        super.preupdate(t,dt);

    }
}