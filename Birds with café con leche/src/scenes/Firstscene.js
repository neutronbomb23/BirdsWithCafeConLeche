class Firstscene extends Phaser.Scene{
	constructor(){
		super('Firstscene');
	}

	init(){
		console.log('Scene Firstscene');
	}
	preload(){
		this.load.image('palomo','./assets/palomo.png');
	}
	create(){
		this.palomo = this.add.image(100,100, 'palomo').setInteractive();
	}
	update(time,delta){

	}
}

export default Firstscene;