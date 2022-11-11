import { Menu } from './menu.js';
import { Game } from './game.js';
import { Scene2 } from "./Scene2.js";
 
export class GamePause extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'GamePause' }); 
    }

    preload (){
        this.load.image('playButton', 'assets/startpng.png');
    }

    init(data){
        console.log(data);
        this.continue = data.me;
    }
    
    create (){
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
      
        playButton.setInteractive();
    

        playButton.on("pointerup", ()=>{
            this.continue.resume();
            this.scene.stop();
        });
    
    }
}