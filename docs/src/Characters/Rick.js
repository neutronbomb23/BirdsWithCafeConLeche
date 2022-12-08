export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.puh = this.scene.GetPuhReference();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.dash = false; // ataque
        this.first = true; // booleano para asegurar que el timer solo se inicia a cero la primera vez
        this.timer = 0; // contador de daño de Rick
        this.dropTimer = 0; // contador que indica cuanto tiempo tardará en salir una nueva gota
        this.timerDrop = 1000; // contador para que Rick se quede parado
        this.TweenActive = false;

        this.body.setCollideWorldBounds(true);
        this.body.setSize(this.body.width - 15, this.body.height -2, true);
        this.setScale(8);
        this.setFlip(false, false);

        this.initAnimations(scene);
    }

    initAnimations(scene){
        this.scene.anims.create({
            key: 'idleR',
            frames: scene.anims.generateFrameNumbers('RickIddle', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('RickWalk', {start:0, end:23}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'attackR',
            frames: scene.anims.generateFrameNumbers('RickAttack', {start:0, end:23}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.Damage = this.scene.tweens.add({
            targets: this,
            scale: this.scale * 0.7,
            duration: 800,
            repeat: 0,
            delay: 10,
            paused: true
        });

        this.play('idleR');
    }

    getX(){
        return this.x; // Devuelve la posicion x de puh
    }

    getY(){
        return this.y; // Devuelve la posicion y de puh
    }

    movementManager(){
        let distY = Math.abs(this.y - this.puh.getY());// distancia en valor absoluto entre Puh y Rick
        let range = this.x - this.puh.getX();// distancia en X entre Puh y Rick

        if(!this.dash && distY < 110) { console.log(this); this.attack(range); }// ataque
        else if(this.dash && (this.x <= 200 || this.x >= 1300)) { this.Dash(); }// daño a Rick
        else if(distY >= 110 && !this.dash) {
            this.bossSound = true;
            if(this.dropTimer >= 5000) { this.ThrowDrop(); } // lanza gota
            else if(this.timerDrop >= 1000) { this.walking(); } // patrulla   
        }
        else if(this.anims.currentAnim.key !== 'attackR') { this.attack(range); }// para evitar bug porque no entra en el ataque al descender Puh
    }

    attack(range){
        if(this.x > 200 && this.x < 1300) { this.dash = true; }// si no está ya en los extremos
        if(range > 0){ // puh está a la izquierda
            this.body.setVelocityX(-900);
            this.setFlip(true, false);
        }
        else{ // puh está a la derecha
            this.body.setVelocityX(900);
            this.setFlip(false, false);
        }
        this.bossSound = true;
        if(this.anims.currentAnim.key !== 'attackR'){// animación
            this.play('attackR');
        }
    }

    Dash(){
        if(this.anims.currentAnim.key === 'attackR'){
            this.body.setVelocityX(0);// para a Rick
            this.play('idleR');// animación
            if(!this.TweenActive){ this.scene.Damage.play(); this.TweenActive = false;}
            else{ this.scene.Damage.resume(); } //tween de daño
            if(this.first){
                this.timer = 0;// contador a 0
                this.first = false;// booleano a false para no reiniciar el contador a cero
                this.scene.rickLives();// resta vida a Rick
            }
        }
        if(this.timer >= 1000){
            this.dash = false;// fin del daño y del ataque
            this.first = true;// booleano a true para reiniciar el contador en el siguiente ataque
            this.scene.Damage.stop();
            this.y = 1250;// Salto final
            this.setScale(8);// vuelve a su escala inicial
        }
    }

    ThrowDrop(){
        this.timerDrop = 0;// contador para que Rick se quede parado
        this.scene.RickDrop();// instancia gota hacia arriba
        this.dropTimer = 0;// contador para la siguiente gota
        this.body.setVelocityX(0);
        this.play('idleR');
    }

    walking(){
        if(this.flipX){ this.body.setVelocityX(-200); } // movimiento hacia la izquierda
        else { this.body.setVelocityX(200); } // movimiento hacia la derecha
        
        if(this.x >= 1150){
            this.setFlip(true, false);// extremo derecho
        }
        else if(this.x <= 200){
            this.setFlip(false, false);// extremo izquierdo
        }
        if(this.anims.currentAnim.key !== 'walk'){ // animación de andar
            this.play('walk');
        }
    }
    
    preUpdate(t, dt){
        this.timer += dt;
        this.dropTimer += dt;
        this.timerDrop += dt;
        super.preUpdate(t,dt);
        this.movementManager();
    }
}