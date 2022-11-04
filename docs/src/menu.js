import { Game } from './game.js';
import { BossScene } from './BossScene.js'

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
        this.load.audio('menuMusic', 'assets/audio/menu.mp3');
        this.load.image('text', 'assets/birdstext.png');
        this.load.image('paloma', 'assets/paloma.png');
        this.load.image('centralperk', 'assets/logopng.png');
        this.load.image('returnButton', 'assets/returnpng.png');
        this.load.image('controls', 'assets/inputsimg.png'); // cambiar por la imágen de controles cuando se tenga
    }

    create(){

        this.add.image(720,900, 'menuFondo').setScale(1.3); // Imagen fondo
        this.add.image(720,500, 'centralperk').setScale(1.5); // Imagen fondo
        this.add.image(220, 1050, 'paloma').setScale(0.4);
        this.add.image(1250, 1050, 'paloma').setScale(0.4);
        this.add.image(720,150, 'text').setScale(1.3);
        
        let bossButton = this.add.image(720, 500, 'playButton').setScale(1); // Botón de Boss
        let playButton = this.add.image(720, 950, 'playButton').setScale(1); // Botón de play
        let optionsButton = this.add.image(720, 1200 , 'optionsButton').setScale(1); // Botón de play
        //this.add.sprite(100,100,'puh');
      
        bossButton.setInteractive();
        playButton.setInteractive();
        optionsButton.setInteractive();

        this.menuMusic = this.sound.add('menuMusic');
        
        this.menuMusic.play();
        playButton.on("pointerup", ()=>{ //Método para empezar el juego cuando se pulse el botón play, también para la música para evitar que se escuche en la escena del juego.
            this.scene.start('game');
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

        bossButton.on("pointerup", ()=>{ //Método para empezar el juego cuando se pulse el botón play, también para la música para evitar que se escuche en la escena del juego.
            this.scene.start('bossScene');
            this.menuMusic.stop();
        })


    }

}


//Podemos cambiar el viewport de la cámara con setViewport:

// this es una Scene
//this.cameras.main.setViewport(200, 150, 400, 300);