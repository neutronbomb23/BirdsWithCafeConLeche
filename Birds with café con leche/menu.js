import { Game } from './game.js';

export class Menu extends Phaser.Scene {

    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Menu' }); 
    }

    preload(){

        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('quitButton', 'assets/quit.png');
        this.load.image('menuFondo', 'assets/menu.jpg');
        this.load.image('puh', 'assets/puh.png');
        this.load.audio('sample', 'assets/audio/sound.mp3');
        this.load.audio('menuMusic', 'assets/audio/menuMusic.mp3');

    }

    create(){

        this.add.image(800,500, 'menuFondo'); // Imagen fondo
       
        let playButton = this.add.image(500,600 , 'playButton').setScale(0.3); // Botón de play
        let quitButton = this.add.image(900,600 , 'quitButton').setScale(0.5); // Botón de play
        this.add.sprite(100,100,'puh');
      

        playButton.setInteractive();
        quitButton.setInteractive();

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

        quitButton.on("pointerup", ()=>{
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