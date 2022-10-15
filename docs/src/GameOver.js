import { Menu } from './menu.js';
import { Game } from './game.js';
 
export class GameOver extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'GameOver' }); 
    }

    preload (){
        this.load.video('video', './assets/video/wench.webm');
        this.load.text('text');
    }
    create (){

        this.gameOverVideo = this.add.video(0,0, 'video').setOrigin(0,0);
        this.gameOverVideo.play();
        this.add.text(400, 1200, 'Pulsa la tecla Q para pasar al menú principal. \nPulsa R para volver a intentarlo.', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 45, color: 'yellow'});
  
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    }
    update(){

        if(this.keyR.isDown){
          this.scene.start('game')
        }
        if(this.keyQ.isDown){
            this.scene.start('Menu')
          }
        
    }
}