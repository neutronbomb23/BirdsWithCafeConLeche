import { Menu } from './Scenes/menu.js';
import { Intro } from './Scenes/intro.js';
import { GameOver } from './Scenes/GameOver.js';
import { GamePause } from './Scenes/inGamePause.js';
import {Scene1 } from './Scenes/Scene1.js';
import {BossScene } from './Scenes/BossScene.js';
import {Victory} from './Scenes/Victory.js';

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("juego"),
    width:  1440,
    height: 1800,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 500,
            height: 188
        },
		max: {
            width: 720,
            height: 900
        },
		zoom: 1
    },

    scene: [Intro, Menu, GameOver,  Scene1, BossScene, GamePause, Victory,],

    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 1000 }, 
            debug: true 
        },
        fps: { forceSetTimeOut: true, target: 60 },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
   transparent: true
};

new Phaser.Game(config);