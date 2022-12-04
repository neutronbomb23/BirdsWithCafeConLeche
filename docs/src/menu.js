import { Game } from './game.js';
import { Scene2 } from './Scene2.js';
import { BossScene } from './BossScene.js'

export class Menu extends Phaser.Scene {
    constructor() {
      // Nombre de la escena para el SceneManager
      super({ key: 'Menu' }); 
    }

    preload(){
        this.load.image('playButton', 'assets/images/buttons/start.png');
        this.load.image('optionsButton', 'assets/images/buttons/controls.png');
        this.load.image('menuFondo', 'assets/images/background/menu.jpg');
        this.load.audio('menuMusic', 'assets/audio/menu.mp3');
        this.load.image('text', 'assets/images/text/birdstext.png');
        this.load.image('paloma', 'assets/images/characters/paloma.png');
        this.load.image('centralperk', 'assets/images/logo/bwccl.png');
        this.load.image('returnButton', 'assets/images/buttons/return.png');
        this.load.image('controls', 'assets/images/text/controls.png'); // cambiar por la imágen de controles cuando se tenga
    }

    create(){

        this.add.image(720,900, 'menuFondo').setScale(1.3); // Imagen fondo
        this.add.image(720,500, 'centralperk').setScale(1.5); // Imagen fondo
        this.add.image(220, 1050, 'paloma').setScale(0.4);
        this.add.image(1250, 1050, 'paloma').setScale(0.4);
        this.add.image(720,150, 'text').setScale(1.3);
        
        let scene2Button = this.add.image(320, 500, 'playButton').setScale(1); // Botón de Boss
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let optionsButton = this.add.image(720, 1200 , 'optionsButton').setScale(1); // Botón de opciones
        //this.add.sprite(100,100,'puh');
      
        playButton.setInteractive();
        optionsButton.setInteractive();
        scene2Button.setInteractive();

        this.menuMusic = this.sound.add('menuMusic');
        
        this.menuMusic.play();
        playButton.on("pointerup", ()=>{ //Método para empezar el juego cuando se pulse el botón play, también para la música para evitar que se escuche en la escena del juego.
            this.scene.start('Scene1', 16800);
            this.menuMusic.stop();
        })

        optionsButton.on("pointerup", ()=>{ //Método que te lleva a la sección de controles.
            //this.scene.start('Menu');
            playButton.visible = false; //Se hace invisible el botón play.
            optionsButton.visible = false; //Se hace invisible el botón de opciones.
            let controls = this.add.image(720, 1075, 'controls').setScale(1.2); //Se imprime en pantalla la imagen que muestra los controles.
            let returnButton = this.add.image(720, 1600, 'returnButton'); //Se imprime un botón  que te lleva de vuelta a la sección principal del menú principal.
            returnButton.setInteractive(); //Se hace el botón interactivo.
            returnButton.on("pointerup", ()=> { //Si se presiona el botón que te devuelve al menú principal, vuelven a aparecer los botones play y controls. Desapaprece el otro y la imagen de los controles.
                returnButton.visible = false; 
                controls.visible = false; 
                playButton.visible = true;
                optionsButton.visible = true;
            })
            //this.menuMusic.stop();
        })

        scene2Button.on("pointerup", ()=>{ //Método para empezar el juego cuando se pulse el botón play, también para la música para evitar que se escuche en la escena del juego.
            this.scene.start('bossScene');
            this.menuMusic.stop();
        })
    }
}


//Podemos cambiar el viewport de la cámara con setViewport:
// this es una Scene
//this.cameras.main.setViewport(200, 150, 400, 300);