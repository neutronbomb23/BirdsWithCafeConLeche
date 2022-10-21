export default class PuhAn extends Phaser.GameObjects.Sprite{
constructor(scene, x, y){
    super(scene, x, y, 'puh');

    this.scene.add.existing(this);

    this.scene.anims.create({
        key: 'idle', //identificador de la animación
        frames: scene.anims.generateFrameNumbers('puhIdle', 
        {
            start:0, // primera imagen que se ejecuta 
            end:3 // última imagen que se ejecuta
        }), 
        frameRate: 5, // frames por segundo
        repeat: 0
    });

    /*this.scene.anims.create({
        key: 'attack',
        frames: scene.anims.generateFrameNumbers('puh', {start:-1, end:-1}),
        frameRate: 5,
        repeat: 0
    });*/

    /*this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
        //console.log(this.anims.currentAnim.key)
        if(this.anims.currentAnim.key === 'attack'){ //comprobamos si la animación que ha terminado es 'attack'
            this.play('idle'); //ejecutamos la animación 'idle'
        }
        
    })*/

    this.play('idle');


    this.setScale(2,2);
}

preUpdate(t, dt){
    super.preUpdate(t, dt);
}

}