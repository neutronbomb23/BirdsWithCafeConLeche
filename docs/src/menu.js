import { Game } from './game.js';

export class Menu extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Menu' }); 
    }

    preload(){

        this.load.image('playButton', 'assets/startpng.png');
        this.load.image('optionsButton', 'assets/controlspng.png');
        this.load.image('menuFondo', 'assets/menu.jpg');
        this.load.image('puh', 'assets/puh.png');
        this.load.audio('menuMusic', 'assets/audio/menuMusic.mp3');
        this.load.image('text', 'assets/birdstext.png');
        this.load.image('paloma', 'assets/paloma.png');
        this.load.image('centralperk', 'assets/logopng.png');

    }

    create(){

        this.add.image(720,900, 'menuFondo').setScale(1.3); // Imagen fondo
        this.add.image(720,500, 'centralperk').setScale(1.5); // Imagen fondo
        this.add.image(220, 1050, 'paloma').setScale(0.4);
        this.add.image(1250, 1050, 'paloma').setScale(0.4);
        this.add.image(720,150, 'text').setScale(1.3);
        
       
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let optionsButton = this.add.image(720, 1200 , 'optionsButton').setScale(1); // Botón de play
        //this.add.sprite(100,100,'puh');
      

        playButton.setInteractive();
        optionsButton.setInteractive();

        this.menuMusic = this.sound.add('menuMusic');
        
        this.menuMusic.play();
        playButton.on("pointerup", ()=>{
            this.scene.start('game');
            this.menuMusic.stop();
        })


        optionsButton.on("pointerup", ()=>{
            this.scene.start('Menu');
            this.menuMusic.stop();
        })


    }

}
//Podemos cambiar el viewport de la cámara con setViewport:

// this es una Scene
//this.cameras.main.setViewport(200, 150, 400, 300);