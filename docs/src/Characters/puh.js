export default class Puh extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'puh');
        this.fly = false;
        this.timer = 5000;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.initAnimations(scene);
        this.body.setSize(this.body.width-18, this.body.height -12, true);
        this.body.offset.y = 12; 
        this.body.setCollideWorldBounds(true);
        this.setScale(3);

        this.w = this.scene.input.keyboard.addKey('W');
        this.s = this.scene.input.keyboard.addKey('S');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    getX(){
        return this.x; // Devuelve la posicion x de puh
    }

    getY(){
        return this.y; // Devuelve la posicion y de puh
    }

    setFly(enabled){
        this.fly = enabled; // Permite cambiar de modo (mov con salto / vuelo)
    }

    slowVel(){
        this.timer = 0;
    }

    characterInputManager(){
        //this.chirp = false;
        // Horizontal
        if(this.a.isDown || this.cursors.left.isDown){
            this.chirp = true;
            if(this.timer >= 5000){
                this.body.setVelocityX(-350);
            }
            else{
                this.body.setVelocityX(-175);
            }
            this.setFlip(true, false);
        }
        else if(this.d.isDown || this.cursors.right.isDown){

            this.chirp = true;

            this.setFlip(true, false);if(this.timer >= 5000){
                this.body.setVelocityX(350);
            }
            else{
                this.body.setVelocityX(175);
            }
            this.setFlip(false, false);
        }
        else{ this.body.setVelocityX(0), this.chirp = false; }
        //Vertical
        if (!this.fly){ // Si no hay vuelo activado
            if((this.w.isDown || this.cursors.up.isDown) && this.body.onFloor()){ this.body.setVelocityY(-750); this.chirp = true;}
            else if (this.body.touching.down){ this.body.setVelocityY(0);this.chirp = false; }
            else if(this.body.touching.up){ this.body.setVelocityY(0); this.chirp = false;}
        }
        else{ // Si hay vuelo activado
            if(this.w.isDown || this.cursors.up.isDown){ this.body.setVelocityY(-500);  this.chirp = true;}
            else if(this.s.isDown || this.cursors.down.isDown){ this.body.setVelocityY(500); this.chirp = true;}
            else{ this.body.setVelocityY(200); this.chirp = false; }
        }
    }

    initAnimations(scene){
        //Se crean las animaciones
        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('puhIddle', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('puhMove', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('puhFly', {start:0, end:5}),
            frameRate: 5,
            repeat: -1
        });
        
        this.play('idle'); // Idle es la animacion por defecto
    }

    animationManager(){
        if(!this.body.onFloor()){ // Vuelo
            if(this.anims.currentAnim.key !== 'fly') {this.play('fly');}
        }
        else if (this.body.velocity.x != 0){ // Movimiento 
            if(this.anims.currentAnim.key !== 'move') {this.play('move');}
        }
        else{ // Idle
            if(this.anims.currentAnim.key !== 'idle') {this.play('idle');}
        }
    }
    
    preUpdate(t, dt){
        this.timer += dt;
        super.preUpdate(t,dt);
        this.characterInputManager(this.fly);
        this.animationManager();
    }
}