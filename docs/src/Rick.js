export default class Rick extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'rick');

        this.puh = this.scene.GetPuhReference();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.dash = false;// ataque
        this.first = true;// booleano para asegurar que el timer solo se inicia a cero la primera vez
        this.timer = 0;// contador de daño de Rick
        this.dropTimer = 0;// contador que indica cuanto tiempo tardará en salir una nueva gota
        this.timerDrop = 1000;// contador para que Rick se quede parado

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
            key: 'attack',
            frames: scene.anims.generateFrameNumbers('RickAttack', {start:0, end:23}),
            frameRate: 5,
            repeat: -1
        });

        this.play('walk');
        this.body.setCollideWorldBounds(true);
        this.setScale(8);
        this.setFlip(false, false);

        this.scene.Damage = this.scene.tweens.add({
            targets: this,
            scale: this.scale*0.7,
            duration: 800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 10
        });

        this.scene.Damage.pause();
        this.scene.Damage.resume(); 
    }

    getX() {
        return this.x; // Devuelve la posicion x de puh
    }

    getY() {
        return this.y; // Devuelve la posicion y de puh
    }

    movementManager(){
        let puhPosX = this.puh.getX();// psoción X de Puh
        let puhPosY = this.puh.getY();// posición Y de Puh
        let distY = Math.abs(this.y - puhPosY);// distancia en valor absoluto entre Puh y Rick
        let range = this.x - puhPosX;// distancia en X entre Puh y Rick

        if(!this.dash && distY < 110) 
        {
            if(this.x > 200 && this.x < 1300)this.dash = true;// si no está ya en los extremos
            if(range > 0) { // puh está a la izquierda
                this.body.setVelocityX(-900);
                this.setFlip(true, false);
                this.bossSound = true;
            }
            else { // puh está a la derecha
                this.body.setVelocityX(900);
                this.setFlip(false, false);
                this.bossSound = true;
            }
            if(this.anims.currentAnim.key !== 'attack') {// animación
            this.play('attack');
            }
        }
        else if(this.dash && (this.x <= 200 || this.x >= 1300)) {// daño a Rick
            if(this.anims.currentAnim.key === 'attack') {
                this.body.setVelocityX(0);// para a Rick
                this.play('idleR');// animación
                this.scene.Damage.resume();//tween de daño
                if(this.first) {
                    this.timer = 0;// contador a 0
                    this.first = false;// booleano a false para no reiniciar el contador a cero
                }
            }
            if(this.timer >= 1000) {
                this.dash = false;// fin del daño y del ataque
                this.first = true;// booleano a true para reiniciar el contador en el siguiente ataque
                this.scene.Damage.pause();// tween pausado
                this.y = 1250;// para que no se caiga por el cambio de escala
                this.setScale(8);// vuelve a su escala inicial
            }
        }
        else if(distY >= 110) {
            this.bossSound = true;
            if(this.dropTimer >= 5000) {
                this.timerDrop = 0;// contador para que Rick se quede parado
                this.scene.RickDrop();// instancia gota hacia arriba
                this.dropTimer = 0;// contador
                this.body.setVelocityX(0);
                this.play('idleR')
            }
            else if(!this.dash && this.timerDrop >= 1000)this.walking(); // patrulla   
        }
    }

    walking(){
        if(this.flipX) {
            this.body.setVelocityX(-200);// movimiento hacia la izquierda
        }
        else {
            this.body.setVelocityX(200);// movimiento hacia la derecha
        }
        //console.log(this.x);
        if(this.x >= 1150) {
            this.setFlip(true, false);// extremo derecho
        }
        else if(this.x <= 200) {
            this.setFlip(false, false);// extremo izquierdo
        }
        if(this.anims.currentAnim.key !== 'walk') { // animación de andar
            this.play('walk');
        }
    }
    
    preUpdate(t, dt){
        this.timer += dt;
        this.dropTimer += dt;
        this.timerDrop += dt;
        //console.log(this.dropTimer);
        super.preUpdate(t,dt);
        this.movementManager();
    }
}