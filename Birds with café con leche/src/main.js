import Firstscene from './scenes/Firstscene.js'

const config = {

	title: 'Birds with café con leche',
	url: '',


	pixelArt: true;

	type: Phaser.AUTO,
	width: 640,
	height: 360,
	parent: 'container',
	backgroundColor: #34495E

	banner:{
		hidePhaser:true,
		text: '#000000',

		background[
		'red'
		'brown'
		'black'
		'transparet'
		]
	},

	scene:[Firstscene]
};

const game = new Phaser.Game(config);