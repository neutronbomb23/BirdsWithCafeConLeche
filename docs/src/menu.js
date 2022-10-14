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
        this.load.image('logo', 'assets/logopng.png');

    }

    create(){

        this.add.image(720,410, 'menuFondo'); // Imagen fondo
        this.add.image(720,150, 'logo');
       
        let playButton = this.add.image(720, 450, 'playButton').setScale(0.6); // Botón de play
        let optionsButton = this.add.image(720, 600 , 'optionsButton').setScale(0.6); // Botón de play
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