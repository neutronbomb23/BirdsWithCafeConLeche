import { Menu } from './menu.js';
import { Scene1 } from './Scene1.js';
 
export class GamePause extends Phaser.Scene {
    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'GamePause' }); 
    }

    preload (){
        this.load.image('playButton', 'assets/images/buttons/start.png');
        this.load.image('loadButton', 'assets/images/buttons/menu.png');
    }

    init(data){
        // Cojo el "dato" o "propiedad" de la escena en donde se ha pulsado el escape, para poder resumir la escena si se presiona el botón.
        this.continue = data.me;
    }

    create (){
        let myScene1 = new Scene1();
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let loadButton = this.add.image(720,1200, 'loadButton').setScale(1); 
         
        loadButton.setInteractive();
      
        playButton.setInteractive();

        playButton.on("pointerup", ()=>{
            this.continue.resume();
            this.scene.stop();
        });

        loadButton.on("pointerup", ()=>{
            this.continue.scene.song.stop();
            this.continue.stop();
            this.scene.start('Menu');
            this.scene.stop();
        });
    }
}