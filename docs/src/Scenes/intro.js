import { Menu } from './menu.js';

export class Intro extends Phaser.Scene {
    constructor() {
      super({ key: 'Intro' }); // Nombre de la escena para el SceneManager
    }

    preload (){
        this.load.video('wench', './assets/video/video.webm');
    }

    create (){
        this.menuvideo = this.add.video(720, 700, 'wench');
        this.menuvideo.play();
        this.add.text(260, 1100, 'Pulsa la tecla S para pasar al menú.', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 64, color: 'yellow'});
        this.menuvideo.on('complete', video => {
            // Cuando acabe el vídeo ejecuta la instrucción de saltar al menú.
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