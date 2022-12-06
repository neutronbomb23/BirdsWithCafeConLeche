export default class WaterDrop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, velocity, scale, name) {
        super(scene, x, y, name);
        this.scale = scale;// escala
        this.v = velocity;// velocidad

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(this.scale);
        this.body.setCollideWorldBounds(true);

        if(this.v < 0)this.body.allowGravity = false;// va hacia arriba
    }

    colisionManager() {
        if (this.body.onFloor() || this.y >= 1400) this.destroy();// destruir la gota al tocar el suelo o llegar a cierta altura
    }
a
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setVelocityY(this.v);
        this.colisionManager();
        if(this.y <= -190){
            this.scene.generateObs();// genera gotas que caen
            this.destroy();
        }
    }
}