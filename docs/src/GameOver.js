import { Menu } from './menu.js';
import { Game } from './game.js';

 
export class GameOver extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'GameOver' }); 
    }

    preload (){

      this.load.image('gameOverPng' , 'assets/gameOverPng.png');

      this.load.text('tryAgain');
       
        this.load.image('returnButton', 'assets/returnpng.png');
        
        this.load.image('menuButton', 'assets/menubut.png');

    }
    
    create (){
        this.add.image(730, 300, 'gameOverPng');
        this.tryagainText = this.add.text(300,600, '                 WANNA PLAY AGAIN?\n I´LL END UP EATING YOU ANYWAYS!', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 50, color: 'black'});
        this.tryagainText.visible = false;
        let returnButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let menuButton = this.add.image(720, 1200 , 'menuButton').setScale(1); // Botón para volver al menú, hay que cambiar el aspecto
        returnButton.setInteractive();
        menuButton.setInteractive();

        returnButton.on("pointerover", ()=>{
          this.tryagainText.visible = true;
      });
      returnButton.on("pointerout", ()=>{
        this.tryagainText.visible = false;
    });

        returnButton.on("pointerup", ()=>{
            this.scene.start('game');
            this.scene.stop();
        });

        menuButton.on("pointerup", ()=>{
            this.scene.start('Menu');
            this.GameOver.stop();
        });
   
    
    }
}