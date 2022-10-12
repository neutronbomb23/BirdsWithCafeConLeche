import { Menu } from './menu.js';
import { Game } from './game.js';
import { Intro } from './intro.js';


const config = {
    type: Phaser.AUTO,
    width: 1700,
    height: 1000,
    scene: [Menu, Game],
    //backgroundColor: "b9eaff",
    physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 200},
              enableBody: true,
              debug: false,
          }
        }
    }

var game = new Phaser.Game(config);