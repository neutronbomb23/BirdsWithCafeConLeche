import { Menu } from './menu.js';
import { Game } from './game.js';
import { Scene2 } from "./Scene2.js";

var respawnPos = 16800;
 
export class GameOver extends Phaser.Scene {
    constructor() {
  // Nombre de la escena para el SceneManager
  super({ key: 'GameOver' }); // identificador para llamar a esta escena desde otras.
  }

  preload () {
    this.load.image('gameOverBlanco' , 'assets/images/text/GameOverBlanco.png'); //Cargar la imagen de Game Over
    this.load.image('returnButton', 'assets/images/buttons/return.png'); //Cargar botón (que actúa como el botón de play)
    this.load.image('menuButton', 'assets/images/buttons/menu.png'); //Cargar botón del menú
  }
  
  init(data){
    respawnPos;
    if (data <= 5700) respawnPos = 5650;
    else if (data <= 10700) respawnPos = 10500;
    else respawnPos = 16800;
  }
    
  create () {
    this.add.image(730, 400, 'gameOverBlanco'); // Carga la imagen en escena
    this.tryagainText = this.add.text(300,650, '              WANNA PLAY AGAIN?\n I´LL END UP EATING YOU ANYWAYS!', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 50, color: 'white'}); //Texto que aparece al poner el cursor encima del botón play
    this.tryagainText.visible = false; // Por defecto, el texto no es visible.
    let returnButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
    let menuButton = this.add.image(720, 1200 , 'menuButton').setScale(1); // Botón para volver al menú, hay que cambiar el aspecto
    returnButton.setInteractive(); // Hace que el botón sea interactivo, para poder pulsar sobre el o para accionar eventos.
    menuButton.setInteractive(); // Hace que el botón sea interactivo, para poder pulsar sobre el o para accionar eventos.

    returnButton.on("pointerover", ()=>{ //Método que si el cursor pasa por encima del botón hace que el texto try again sea visible.
    this.tryagainText.visible = true;
    });
    
    returnButton.on("pointerout", ()=>{ //Método para cuando el cursor se aparte del botón desaparezca el texto.
    this.tryagainText.visible = false;
    });

    returnButton.on("pointerup", ()=>{ //Método que te lleva al nivel donde has muerto si se presiona el botón play.
    this.scene.start('Scene1', respawnPos);
    this.scene.stop();
    });

    menuButton.on("pointerup", ()=>{ //Método que te lleva al menú principal si se presiona el botón menú.
    this.scene.start('Menu');
    this.scene.stop();
    });
  }
}