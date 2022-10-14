export default class Obstacles extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, colliderGroup, name) {
		super(scene, x, y, name);
		this.setScale(0.5,.5);
		this.scene.add.existing(this); 

    
    this.scene.anims.create({
		key: 'none',
		frames: scene.anims.generateFrameNumbers('b', {start:0, end:0}),
		frameRate: 5,
		repeat: -1
    }
		}
    }