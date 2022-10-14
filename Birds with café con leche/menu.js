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
        this.load.audio('sample', 'assets/audio/sound.mp3');
        this.load.audio('menuMusic', 'assets/audio/menuMusic.mp3');
        this.load.image('logo', 'assets/logopng.png');

    }

    create(){

        this.add.image(850,500, 'menuFondo'); // Imagen fondo
        this.add.image(850,150, 'logo');
       
        let playButton = this.add.image(850, 450, 'playButton').setScale(1); // Botón de play
        let optionsButton = this.add.image(850, 650 , 'optionsButton').setScale(1); // Botón de play
        //this.add.sprite(100,100,'puh');
      

        playButton.setInteractive();
        optionsButton.setInteractive();

        this.menuMusic = this.sound.add('menuMusic');
        this.sampleSound = this.sound.add('sample');
        
        this.menuMusic.play();
        playButton.on("pointerup", ()=>{
            this.scene.start('game');
            this.stopAudio();
            this.menuMusic.stop();
        })

        playButton.on("pointerover", ()=>{
            console.log("wasap covid china");

            this.playAudio();
        })

        playButton.on("pointerout", ()=>{
            console.log("estoy fuera");
            
            this.stopAudio();
        })

        optionsButton.on("pointerup", ()=>{
            this.scene.start('Menu');
            this.menuMusic.stop();
        })


    }
    playAudio(){
        this.sampleSound.play();
    }
    stopAudio(){
        this.sampleSound.stop();
    }
}
//Podemos cambiar el viewport de la cámara con setViewport:

// this es una Scene
//this.cameras.main.setViewport(200, 150, 400, 300);