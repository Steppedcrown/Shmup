class EnemyLaser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, projSpd) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        this.wave = scene.wave;
        this.projSpd = projSpd;
  
        this.setScale(0.3);
        this.setDepth(-1);
  
        return this;
    }
  
    update() {
        if (this.active) {
            this.y += this.projSpd;
            if (this.y < 0) {
                this.makeInactive();
            }
  
            // Check for collision with player
            if (this.scene.collides(this, this.scene.player)) {
                this.scene.damagePlayer(1);
            }
        }
    }
  
    makeActive() {
        this.visible = true;
        this.active = true;
    }
  
    makeInactive() {
        this.visible = false;
        this.active = false;
    }
  }