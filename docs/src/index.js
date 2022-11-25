import { Menu } from './menu.js';
import { Game } from './game.js';
import { Intro } from './intro.js';
import { GameOver } from './GameOver.js';
import { GamePause } from './inGamePause.js';
import {Scene1 } from './Scene1.js';
import {Scene2 } from './Scene2.js';
import {BossScene } from './bossScene.js';


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
            width: 1500,
            height: 1800
        },
		zoom: 1
    },
    
    scene: [Intro, Menu, Game, GameOver, GamePause, Scene1, BossScene, Scene2],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 1000 }, 
            debug: true 
        },
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