class EnemyLaser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, projSpd) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        this.wave = scene.wave;
        this.projSpd = 15;
        this.damage = 1;
  
        this.setScale(0.3);
        this.setDepth(-1);
  
        return this;
    }
  
    update() {
        if (this.active) {
            this.y += this.projSpd;
            if (this.y > this.scene.game.config.height + 100) {
                this.makeInactive();
            }
  
            // Check for collision with player
            if (this.scene.collides(this, this.scene.player)) {
                this.scene.damagePlayer(this.damage);
                this.makeInactive();
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