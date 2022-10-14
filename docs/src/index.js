import { Menu } from './menu.js';
import { Game } from './game.js';
import { Intro } from './intro.js';


let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("juego"),
    width:  1440,
    height: 810,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1440,
            height: 810
        },
		zoom: 1
    },
    scene: [Menu, Game],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 200 }, 
            debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    }
};

new Phaser.Game(config);