import { Menu } from './menu.js';
 
export class Victory extends Phaser.Scene {
    constructor() {
  // Nombre de la escena para el SceneManager
  super({ key: 'Victory' }); // identificador para llamar a esta escena desde otras.
  }

  preload () {
    this.load.image('menuButton', 'assets/images/buttons/menu.png'); //Cargar botón del menú
    this.load.image('Victory', 'assets/images/text/Victory.png'); //Cargar botón del menú
  }
    
  create () {
    //this.add.image(730, 400, 'gameOverBlanco'); // Carga la imagen en escena
    let menuButton = this.add.image(720, 1400 , 'menuButton').setScale(2); // Botón para volver al menú, hay que cambiar el aspecto
    let victory = this.add.image(720, 800 , 'Victory').setScale(3); // Botón para volver al menú, hay que cambiar el aspecto
    menuButton.setInteractive(); // Hace que el botón sea interactivo, para poder pulsar sobre el o para accionar eventos.

    menuButton.on("pointerup", ()=>{ //Método que te lleva al menú principal si se presiona el botón menú.
    this.scene.start('Menu');
    this.scene.stop();
    });
  }
}