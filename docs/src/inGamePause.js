import { Menu } from './menu.js';
import { Game } from './game.js';
 
export class GamePause extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'GamePause' }); 
    }

    preload (){
       
        this.load.image('playButton', 'assets/startpng.png');
        
        this.load.image('optionsButton', 'assets/controlspng.png');

    }
    init(data){
        console.log(data);
        this.continue = data.me;
    }
    create (){
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let optionsButton = this.add.image(720, 1200 , 'optionsButton').setScale(1); // Botón de play
        playButton.setInteractive();
        optionsButton.setInteractive();

        playButton.on("pointerup", ()=>{
            this.continue.resume();
            this.scene.stop();
        });

        optionsButton.on("pointerup", ()=>{
            this.scene.start('Menu');
            this.continue.stop();
        });
   
    
    }
}