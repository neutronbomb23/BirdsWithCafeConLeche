export default class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'platform');
        this.scene.add.existing(this); 
         this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        // Colisiona con las paredes, tiene un body para que pueda interactuar con los demás objetos y es inamovible.
    }
}