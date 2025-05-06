class Laser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {        
      super(scene, x, y, texture, frame);
      this.visible = false;
      this.active = false;

      this.setScale(0.3);
      this.setDepth(-1);

      return this;
  }

  update() {
      if (this.active) {
          this.y -= this.scene.playerProjectileSpeed;
          if (this.y < 0) {
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