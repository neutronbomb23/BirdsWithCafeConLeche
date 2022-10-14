import { Menu } from './menu.js';

export class Intro extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Intro' }); 
    }

    preload (){
        this.load.video('video', 'assets/video/video.webm');
    }
    create (){
        this.menuvideo = this.add.video('video');
    }
    update(){
        this.menuvideo.play(true);
    }
}