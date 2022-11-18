import { Menu } from './menu.js';

export class Intro extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Intro' }); 
    }

    preload (){
        this.load.video('wench', './assets/video/video.webm');
    }
    create (){

        this.menuvideo = this.add.video(0,0, 'wench').setOrigin(0,0);
        this.menuvideo.play();
        this.add.text(260, 720, 'Pulsa la tecla S para pasar al menú.', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 64, color: 'yellow'});
        this.menuvideo.on('complete', video => {

            this.scene.start('Menu');

        });

   

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        
       
    }
    update(){

        if(this.keyS.isDown){
          this.scene.start('Menu')
        }
        
    }
}