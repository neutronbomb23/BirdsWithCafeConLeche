import { Menu } from './menu.js';
import { Game } from './game.js';
import { Intro } from './intro.js';
import { GameOver } from './GameOver.js';
import { Scene2 } from "./Scene2.js";
import { GamePause } from './inGamePause.js';
import { BossScene } from './BossScene.js';
//import { FadeScene } from './fadeOutScene.js';


let config = {
    
    type: Phaser.CANVAS,
    canvas: document.getElementById("juego"),
    width:  1440,
    height: 1800,
    pixelArt: true,
	scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
		mode: Phaser.Scale.FIT,
		min: {
            width: 500,
            height: 308
        },
		max: {
            width: 1500,
            height: 2000
        },
		zoom: 1
    },
    
    scene: [Intro, Menu, Game, Scene2, GameOver, GamePause, BossScene],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 700 }, 
            debug: true
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },

   transparent: false
   
    
};

new Phaser.Game(config);